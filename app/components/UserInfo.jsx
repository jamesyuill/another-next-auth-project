'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="user-info">
      <div>Name: {session?.user?.name}</div>
      <div>Email: {session?.user?.email}</div>
      <button
        className="user-logout"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}
