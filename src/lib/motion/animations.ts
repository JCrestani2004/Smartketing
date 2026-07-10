// src/lib/motion/animations.ts

import { animate } from "motion";
import { motionConfig } from "./config";

const defaultOptions = {
  duration: motionConfig.duration.normal,
  easing: motionConfig.easing,
};

export type AnimationOptions = {
  delay?: number;
  duration?: number;
};

function getOptions(options?: AnimationOptions) {
  return {
    duration: options?.duration ?? defaultOptions.duration,
    delay: options?.delay ?? 0,
    easing: defaultOptions.easing,
  };
}

export const animations = {
  revealUp(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
        y: [motionConfig.distance.md, 0],
      },
      getOptions(options)
    );
  },

  revealDown(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
        y: [-motionConfig.distance.md, 0],
      },
      getOptions(options)
    );
  },

  revealLeft(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
        x: [-motionConfig.distance.md, 0],
      },
      getOptions(options)
    );
  },

  revealRight(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
        x: [motionConfig.distance.md, 0],
      },
      getOptions(options)
    );
  },

  fade(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
      },
      getOptions(options)
    );
  },

  scale(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
        scale: [0.92, 1],
      },
      getOptions(options)
    );
  },

  scaleBig(element: HTMLElement, options?: AnimationOptions) {
    animate(
      element,
      {
        opacity: [0, 1],
        scale: [1.3, 1],
      },
      getOptions(options)
    );
  },

  zoomInUp(element: HTMLElement, options?: AnimationOptions) {
  animate(
    element,
    {
      opacity: [0, 1],
      scale: [0.92, 1],
      y: [motionConfig.distance.md, 0],
    },
    getOptions(options)
  );
},
};

export type AnimationName = keyof typeof animations;