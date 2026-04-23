"use client";

import { useEffect } from "react";

export function OkidexDebugger() {
  useEffect(() => {
    console.log("%c--- OKIDEX CONFIG DEBUGGER ---", "color: #2563eb; font-weight: bold; font-size: 12px;");
    console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    
    const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (key === "AIzaSyCN6uhJT_aUSTj5psl9Ru5viR50M7oyNY8") {
      console.error("CRITICAL: Still using the EXPIRED API Key!");
    }
    console.log("%c-----------------------------", "color: #2563eb; font-weight: bold;");
  }, []);

  return null;
}
