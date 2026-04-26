"use client";

import { useState } from "react";

const MAX_SUBJECT = 240;
const MAX_MESSAGE = 12000;
const MAX_EMAIL = 320;

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

type ContactFormProps = {
  /** Public URL of the Cloudflare Worker (e.g. https://portfolio-contact.<account>.workers.dev) */
  endpoint?: string;
  className?: string;
};

export function ContactForm({ endpoint, className = "" }: ContactFormProps) {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const configured = Boolean(endpoint?.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured || !endpoint) {
      setStatus("error");
      setErrorMessage("Contact endpoint is not configured.");
      return;
    }

    const sub = subject.trim();
    const msg = message.trim();
    const from = fromEmail.trim();

    if (!from || !isValidEmail(from)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }
    if (!sub || !msg) {
      setStatus("error");
      setErrorMessage("Subject and message are required.");
      return;
    }
    if (sub.length > MAX_SUBJECT || msg.length > MAX_MESSAGE || from.length > MAX_EMAIL) {
      setStatus("error");
      setErrorMessage("Input is too long.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromEmail: from, subject: sub, message: msg }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      setStatus("success");
      setSubject("");
      setMessage("");
      setFromEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className={`border border-outline-variant/20 bg-background p-6 md:p-8 ${className}`.trim()}>
      <h3 className="font-headline text-2xl font-light tracking-tight text-on-background">Get in touch</h3>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1.5">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Email</span>
          <input
            type="email"
            name="fromEmail"
            value={fromEmail}
            onChange={(ev) => setFromEmail(ev.target.value)}
            autoComplete="email"
            required
            disabled={!configured || status === "loading"}
            className="border border-outline-variant/25 bg-surface-container-low px-3 py-2 text-sm text-on-background outline-none transition-colors focus:border-primary/50 disabled:opacity-50"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Subject</span>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(ev) => setSubject(ev.target.value)}
            maxLength={MAX_SUBJECT}
            required
            disabled={!configured || status === "loading"}
            className="border border-outline-variant/25 bg-surface-container-low px-3 py-2 text-sm text-on-background outline-none transition-colors focus:border-primary/50 disabled:opacity-50"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Message</span>
          <textarea
            name="message"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            maxLength={MAX_MESSAGE}
            rows={3}
            required
            disabled={!configured || status === "loading"}
            className="max-h-32 min-h-[4.5rem] resize-y border border-outline-variant/25 bg-surface-container-low px-3 py-2 text-sm leading-relaxed text-on-background outline-none transition-colors focus:border-primary/50 disabled:opacity-50"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={!configured || status === "loading"}
            className="border border-outline-variant/30 bg-surface-container-high px-5 py-2 font-label text-[10px] uppercase tracking-[0.22em] text-on-background transition-colors hover:border-primary/40 disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Send"}
          </button>
          {status === "success" ? (
            <span className="text-sm text-on-surface-variant">Sent. I’ll get back to you soon.</span>
          ) : null}
          {status === "error" ? (
            <span className="text-sm text-error-dim">{errorMessage}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
