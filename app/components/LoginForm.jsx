'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError('Invalid credentials');
        return;
      }
      router.replace('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginform-container">
      <div>
        <h2>Login</h2>
      </div>
      <form className="loginform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>

        {error && <div className="error-message">{error}</div>}

        <div className="register">
          <Link href={'/register'}>
            Don't have an account? <span>Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
