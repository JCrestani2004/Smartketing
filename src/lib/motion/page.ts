// src/lib/motion/page.ts

import { createObserver, destroyObserver } from "./observer";

export function initPageAnimations() {
  createObserver();

  document.addEventListener("astro:page-load", () => {
    destroyObserver();
    createObserver();
  });
}