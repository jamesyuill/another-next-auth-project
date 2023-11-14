'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are nessesary');
      return;
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError('User already exists');
        return;
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/');
      } else {
        console.log('user registration failed');
      }
    } catch (error) {
      console.log('error during registration');
    }
  };

  return (
    <div className="loginform-container">
      <div>
        <h2>Register</h2>
      </div>
      <form className="loginform" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Register</button>

        {error && <div className="error-message">{error}</div>}

        <div className="register">
          <Link href={'/'}>
            Already have an account? <span>Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
