import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      "SELECT username, email, created_at FROM users WHERE id = ?",
      [id]
    ) as [Array<{ username: string; email: string; created_at: string }>, any];

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User fetched successfully", data: rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Error fetching user from database" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { username, email } = body;

    if (!username || !email) {
      return NextResponse.json({ error: "Username and email are required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );

    const affectedRows = (result as import("mysql2").OkPacket).affectedRows;

    if (affectedRows === 0) {
      return NextResponse.json({ error: "No user found with the given ID" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required for deletion" }, { status: 400 });
  }

  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    const affectedRows = (result as import("mysql2").OkPacket).affectedRows;

    if (affectedRows === 0) {
      return NextResponse.json({ error: "No user found with the given ID" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json({ error: "Error in deleting data from users table" }, { status: 500 });
  }
}
