import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export function GET() {
  const md = readFileSync(
    join(process.cwd(), "content", "skyguy.md"),
    "utf-8",
  );
  return new NextResponse(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
