import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, username, email, created_at FROM users"
    ) as [Array<{ id: number; username: string; email: string; created_at: string }>, any];

    return NextResponse.json({ message: "Users fetched successfully", data: rows });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users from database" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email } = body;

    if (!username || !email) {
      return NextResponse.json({ error: "Username and email are required" }, { status: 400 });
    }
    const [result] = await pool.query(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );
    const insertId = (result as import("mysql2").OkPacket).insertId;
    return NextResponse.json({
      message: "User created successfully",
      data: { id: insertId, username, email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user in database" }, { status: 500 });
  }
}
