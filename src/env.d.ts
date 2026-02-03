/// <reference types="astro/client" />
import type { Tconst } from "i18next";

// Put the augmentation in a declare global block
declare global {
  namespace App {
    interface Locals {
      t: Tconst;
    }
  }
}

export {};
