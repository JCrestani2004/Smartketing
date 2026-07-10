import { distance } from "motion";

export const motionConfig = {
  duration: {
    fast: 0.35,
    normal: 0.6,
    slow: 1,
  },

  distance: {
    sm: 20,
    md: 35,
    lg: 50,
  },

  stagger: {
    fast: 0.08,
    normal: 0.12,
    slow: 0.18,
  },

  delay: {
    none: 0,
    sm: 0.15,
    md: 0.3,
    lg: 0.45,
  },

  easing: [0.22, 1, 0.36, 1] as const,
};
