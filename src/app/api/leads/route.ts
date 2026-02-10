import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  if (!name?.trim() || !email?.trim() || !email.includes("@")) {
    return NextResponse.json(
      { error: "Name and valid email are required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("leads")
    .upsert(
      { name: name.trim(), email: email.trim().toLowerCase() },
      { onConflict: "email" }
    );

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
