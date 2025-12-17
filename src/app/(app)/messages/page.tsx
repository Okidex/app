// app/messages/page.tsx

"use client"; // Must be at the top

import MessagesClientContent from './client';

// Forces this page to be rendered at request time, bypassing static generation issues.
export const dynamic = 'force-dynamic';

export default function MessagesPage() {
  return <MessagesClientContent />;
}
