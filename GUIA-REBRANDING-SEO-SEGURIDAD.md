# Guía de Rebranding, SEO y Seguridad — Brandoors

Este documento resume **lo que ya se hizo** en el código y **lo que tú debes completar manualmente**.

---

## ✅ Lo que ya quedó hecho (en el código)

- **Rebranding:** todos los textos "Smartketing" → "Brandoors", correos a `contacto@brandoorsestudio.com`, dominio a `brandoorsestudio.com`, copyright a "© 2026 BRANDOORS".
- **Logos:** ahora se cargan desde `src/assets/brandoors/` (logo.svg e isotipo.svg). **Son provisionales** (ver abajo).
- **SEO:** dominio oficial configurado, sitemap automático, `robots.txt`, URL canónica, Open Graph + Twitter Cards (con imagen para compartir) y datos estructurados (Schema.org).
- **Correcciones:** un solo `<h1>` por página, enlace del footer corregido, imagen del Hero priorizada.
- **Seguridad:** la librería AOS se empaquetó dentro del proyecto (ya no depende de un CDN externo) y se añadió un `.htaccess` con cabeceras de seguridad.

---

## 📌 Lo que TÚ debes completar

### 1. Logos y favicon — ✅ HECHO
- `src/assets/brandoors/logo.svg` → usa la variante oficial **02** (texto blanco) para el fondo oscuro.
- `src/assets/brandoors/isotipo.svg` → favicon generado a partir del símbolo oficial (cian + coral).
- El paquete completo (AI, EPS, PDF, PNG, JPG, SVG) quedó en `src/assets/brandoors/`. Astro solo usa `logo.svg` e `isotipo.svg`; los demás archivos no afectan el sitio (puedes dejarlos como respaldo o moverlos fuera de `src/` para aligerar el repo).

### 2. Imagen para compartir en redes
Crea una imagen de **1200×630 px** con el branding de Brandoors y guárdala como:
- `public/og-image.jpg`

(Es la imagen que aparece al pegar el link en WhatsApp, Instagram, LinkedIn, etc.)

### 3. Instagram nuevo
Cuando tengas el usuario de Instagram de Brandoors, hay que actualizarlo en 2 lugares:
- `src/components/Footer.astro` (el enlace de "Síguenos").
- `src/layouts/Layout.astro` (descomentar la línea `sameAs` del bloque de datos estructurados).

### 4. Confirmar el teléfono
Revisa que `+57 301 587 8938` en `src/pages/contacto.astro` siga vigente.

### 5. Tras publicar el sitio
- Da de alta el dominio en **Google Search Console** y envía el sitemap: `https://brandoorsestudio.com/sitemap-index.xml`.
- Activa el **certificado SSL (HTTPS)** y, una vez funcionando, descomenta en `public/.htaccess` las líneas de **HSTS** y **redirección a HTTPS**.

---

## 🔒 Seguridad del formulario de contacto (`php/send.php`) — revisado ✅

El archivo está **bien hecho**. Ya cumple lo importante:

- ✅ Solo acepta envíos POST.
- ✅ Valida el correo con `FILTER_VALIDATE_EMAIL`.
- ✅ Sanitiza los datos con `htmlspecialchars` + `trim` (evita XSS en el correo).
- ✅ Usa PHPMailer, que protege contra inyección de cabeceras (CRLF).
- ✅ Tiene honeypot anti-spam → **y ya añadimos el campo oculto `website` a los formularios** para que funcione de verdad.
- ✅ Actualizado al dominio nuevo (`contacto@brandoorsestudio.com`).

Pendiente / recomendado:
- [ ] **Actualizar la contraseña** SMTP en `send.php` (línea `$mail->Password`) al crear la cuenta del nuevo dominio.
- [ ] *(Opcional)* **Límite de envíos** por IP para frenar abuso masivo.
- [ ] *(Opcional)* Añadir **Cloudflare Turnstile** o **hCaptcha** (anti-bot gratuito) si llegara spam.
- [ ] Mantener la carpeta `php/` **fuera de git** (ya está en `.gitignore`) para no exponer credenciales.

---

## 📦 Dependencias (vulnerabilidades de `npm audit`)

`npm audit` reporta 13 avisos (Astro, Vite, etc.). Contexto importante:

- Este sitio es **estático** (se publica como HTML), por lo que **la mayoría de esos avisos afectan solo al entorno de desarrollo** (tu PC mientras programas), no al sitio publicado.
- **NO uses `npm audit fix --force`:** salta a Astro 7, que es un cambio mayor y puede romper el sitio.
- **Recomendado:** planificar una actualización a la última versión de Astro **probando el sitio después** (no de golpe en producción).


# CORRECCIONES

1. Usa validación segura (Optional Chaining)
Busca en tus archivos .astro o archivos .js dónde estás llamando a .getAttribute(). Lo ideal es que nunca dispares ese método a ciegas sin antes comprobar si el elemento realmente existe.

Cómo suele estar el error:

JavaScript
const miBoton = document.querySelector('.btn-toggle');
const target = miBoton.getAttribute('data-target'); // Si miBoton es null, la consola explota.
Cómo solucionarlo de forma segura:

JavaScript
const miBoton = document.querySelector('.btn-toggle');
if (miBoton) {
  const target = miBoton.getAttribute('data-target');
  // ... tu lógica aquí
}
2. Escucha el evento correcto del Client Router
<!-- Si el script maneja cosas como el menú móvil o animaciones, asegúrate de que no esté usando DOMContentLoaded o ejecutándose suelto en la etiqueta <script>. Con el Client Router activo, debes encapsular tu código dentro del evento nativo de Astro: -->

HTML
<!-- <script>
  document.addEventListener('astro:page-load', () => {
    // Todo tu código interactivo del DOM va aquí adentro.
    // Esto garantiza que se ejecute en la carga inicial Y en cada cambio de página.
  });
</script> -->
Es un detalle menor de optimización de código, pero solucionarlo hará que la experiencia de navegación del usuario sea perfecta y fluida.