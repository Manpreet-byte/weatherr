import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="h-44 bg-gradient-hero"></div>
      <div className="-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
