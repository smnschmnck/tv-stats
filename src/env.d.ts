/// <reference types="astro/client" />
import type { TFunction } from "i18next";

// Put the augmentation in a declare global block
declare global {
  namespace App {
    interface Locals {
      t: TFunction;
    }
  }
}

export {};
