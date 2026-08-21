// src/lib/motion/observer.ts

import { inView } from "motion";
import { animations, type AnimationName } from "./animations";

let cleanupFunctions: (() => void)[] = [];

export function createObserver() {
  destroyObserver();

  // Le avisa al script inline del Layout que el bundle sí arrancó, para que no
  // dispare su red de seguridad y muestre todo sin animar.
  document.documentElement.setAttribute("data-motion-activo", "");

  // Quien pide menos movimiento no necesita observador: el CSS ya deja el
  // contenido visible y animarlo iría en contra de su preferencia.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const elements = document.querySelectorAll<HTMLElement>("[data-motion]");

  elements.forEach((element) => {
    const animationName = element.dataset.motion as AnimationName;

    const animation = animations[animationName];

    if (!animation) return;

    // Number("0,2") da NaN: si alguien escribe el delay con coma decimal,
    // lo tratamos como 0 en vez de pasarle NaN a motion.
    const delay = Number(element.dataset.motionDelay) || 0;
    const duration = Number(element.dataset.motionDuration) || 0;

    // El estado inicial (opacity: 0) lo pone global.css a través de la clase
    // .motion-ready del <html>. Hacerlo aquí obligaba a esperar a que cargara
    // este bundle, y hasta entonces el contenido se veía, se ocultaba y volvía.

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