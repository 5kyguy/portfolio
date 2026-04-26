/**
 * Cloudflare Worker: contact form → email (Email Routing `send_email` binding).
 *
 * Configure in `wrangler.jsonc` and set vars:
 * - CONTACT_FROM: verified sender on your Email Routing domain (e.g. contact@yourdomain.com)
 * - ALLOWED_ORIGINS: comma-separated list of origins allowed to POST (e.g. https://yoursite.pages.dev,http://localhost:3000)
 *
 * Docs: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
 */
import { EmailMessage } from "cloudflare:email";

type EmailSendBinding = { send(message: EmailMessage): Promise<void> };

const RECIPIENT = "0x5kyguy@gmail.com";
const MAX_JSON_BYTES = 32_000;
const MAX_SUBJECT = 240;
const MAX_MESSAGE = 12_000;
const MAX_EMAIL = 320;

export interface Env {
  NOTIFY: EmailSendBinding;
  CONTACT_FROM: string;
  /** Comma-separated origins for CORS (e.g. https://example.com,http://localhost:3000) */
  ALLOWED_ORIGINS?: string;
}

function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

function sanitizeHeaderLine(s: string): string {
  return s.replace(/[\r\n\u0000]/g, "").slice(0, MAX_SUBJECT);
}

function buildPlainMime(from: string, to: string, subject: string, body: string): string {
  const safeSubject = sanitizeHeaderLine(subject);
  const b64 = utf8ToBase64(body);
  return [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${safeSubject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64,
  ].join("\r\n");
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function allowedOrigins(env: Env): string[] {
  const fromEnv = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  if (fromEnv.length > 0) return fromEnv;
  return ["http://localhost:3000", "http://127.0.0.1:3000"];
}

function corsHeaders(request: Request, env: Env): Headers {
  const headers = new Headers();
  const origin = request.headers.get("Origin") ?? "";
  const allowed = allowedOrigins(env);
  if (origin && allowed.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}

type Body = { fromEmail?: string; subject?: string; message?: string };

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const baseHeaders = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: baseHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: baseHeaders });
    }

    const contentLength = request.headers.get("Content-Length");
    if (contentLength && Number(contentLength) > MAX_JSON_BYTES) {
      return new Response("Payload too large", { status: 413, headers: baseHeaders });
    }

    let json: Body;
    try {
      const raw = await request.text();
      if (raw.length > MAX_JSON_BYTES) {
        return new Response("Payload too large", { status: 413, headers: baseHeaders });
      }
      json = JSON.parse(raw) as Body;
    } catch {
      return new Response("Invalid JSON", { status: 400, headers: baseHeaders });
    }

    const fromEmail = (json.fromEmail ?? "").trim();
    const subject = (json.subject ?? "").trim();
    const message = (json.message ?? "").trim();

    if (!fromEmail || !isValidEmail(fromEmail)) {
      return new Response("Invalid fromEmail", { status: 400, headers: baseHeaders });
    }
    if (!subject || !message) {
      return new Response("Missing subject or message", { status: 400, headers: baseHeaders });
    }
    if (fromEmail.length > MAX_EMAIL || subject.length > MAX_SUBJECT || message.length > MAX_MESSAGE) {
      return new Response("Field too long", { status: 400, headers: baseHeaders });
    }

    const contactFrom = (env.CONTACT_FROM ?? "").trim();
    if (!contactFrom || !isValidEmail(contactFrom)) {
      return new Response("Server misconfigured: CONTACT_FROM", { status: 500, headers: baseHeaders });
    }

    const textBody = [`From (visitor): ${fromEmail}`, "", message].join("\n");
    const mime = buildPlainMime(contactFrom, RECIPIENT, `[Portfolio] ${subject}`, textBody);
    const emailMsg = new EmailMessage(contactFrom, RECIPIENT, mime);

    try {
      await env.NOTIFY.send(emailMsg);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "send failed";
      return new Response(msg, { status: 502, headers: baseHeaders });
    }

    const out = new Headers(baseHeaders);
    out.set("Content-Type", "application/json");
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: out });
  },
};

export default worker;
