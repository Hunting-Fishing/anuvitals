import React from 'react';

export function WelcomeHeader() {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-2">Welcome to Health Companion</h1>
      <p className="text-muted-foreground text-lg">
        Your personal guide to healthier food choices
      </p>
    </header>
  );
}