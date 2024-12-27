"use client";

import { useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export default function FetchAllUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", { method: "GET" });
      const data = await response.json();

      if (data.data) {
        setUsers(data.data); 
      } else {
        alert(data.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={fetchUsers}
        className="bg-blue-500 text-white rounded px-4 py-2 font-bold hover:bg-blue-700"
      >
        Get All Users
      </button>

      {users.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Users Table</h2>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
