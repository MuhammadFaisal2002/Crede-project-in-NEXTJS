'use client';

import { useState } from 'react';
export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage('User added successfully!');
        setForm({ username: '', email: '', password: '' }); // Reset the form
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage('Error: Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
    
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-md w-full">
    
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center mt-2">Sign up to get started!</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.startsWith('User added')
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
