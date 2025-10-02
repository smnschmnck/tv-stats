/// <reference types="astro/client" />

// This tells Astro that we'll add `t` to locals.
declare namespace App {
  interface Locals {
    t: (key: string, options?: Record<string, unknown>) => string;
  }
}
