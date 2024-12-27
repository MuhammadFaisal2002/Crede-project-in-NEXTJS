import bcrypt from "bcrypt";
import pool from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); 
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );
        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error saving user data:", error);
        return NextResponse.json({ error: "Error saving user data" }, { status: 500 });
    }
}
export function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}