"use client";

import { useEffect } from "react";

export function OkidexDebugger() {
  useEffect(() => {
    console.log("%c--- OKIDEX FLIGHT RECORDER ACTIVE ---", "color: #f59e0b; font-weight: bold; font-size: 14px;");

    // Intercept Fetch to catch 500 error bodies
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      if (response.status === 500) {
        const clone = response.clone();
        try {
          const text = await clone.text();
          console.error(`%c[NETWORK-CRASH] 500 Error at ${args[0]}:`, "color: red; font-weight: bold;", text.substring(0, 500));
        } catch (e) {}
      }
      return response;
    };

    // Global Error Interceptor
    window.addEventListener('error', (event) => {
      console.error("%c[UNCAUGHT-ERROR]", "color: white; background: red; padding: 2px;", event.error?.message || event.message);
      if (event.error?.stack) console.log(event.error.stack);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error("%c[PROMISE-REJECTION]", "color: white; background: darkred; padding: 2px;", event.reason?.message || event.reason);
    });

    console.log("Debugger: Monitoring Server Actions and Dynamic Routes...");
  }, []);

  return null;
}
