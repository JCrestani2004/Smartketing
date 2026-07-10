// src/lib/motion/observer.ts

import { inView } from "motion";
import { animations, type AnimationName } from "./animations";

let cleanupFunctions: (() => void)[] = [];

export function createObserver() {
  destroyObserver();

  const elements = document.querySelectorAll<HTMLElement>("[data-motion]");

  elements.forEach((element) => {
    const animationName = element.dataset.motion as AnimationName;

    const animation = animations[animationName];

    if (!animation) return;

    const delay = Number(element.dataset.motionDelay ?? 0);
    const duration = Number(element.dataset.motionDuration ?? 0);

    // Estado inicial
    element.style.opacity = "0";

    const stop = inView(
      element,
      () => {
        animation(element, {
          delay,
          duration: duration || undefined,
        });
      },
      {
        margin: "0px 0px -15% 0px",
      }
    );

    cleanupFunctions.push(stop);
  });
}

export function destroyObserver() {
  cleanupFunctions.forEach((stop) => stop());

  cleanupFunctions = [];
}