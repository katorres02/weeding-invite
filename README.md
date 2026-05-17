# Wedding Invite — Sitio Web de Invitación de Boda

Sitio web estático de una sola página para invitación de boda. Sin frameworks, sin dependencias npm, sin proceso de build — HTML + CSS + JS puro con librerías por CDN.

## Características

- **Animación de sobre**: Al cargar la página aparece un sobre vintage con sello de cera. Al hacer clic en el sello, el sobre se abre con animación 3D (GSAP) y revela la invitación.
- **Cuenta regresiva** en tiempo real hasta el día de la boda.
- **Galería de fotos** con lightbox, navegación por teclado y accesibilidad completa.
- **Sección RSVP** que redirige a un Google Form (los datos van directo a Google Sheets).
- **Mapa embebido** de Google Maps con la ubicación del evento.
- **Código de vestimenta** con paleta de colores sugerida.
- **Mesa de regalos** con link al registro.
- **Animaciones de scroll** con AOS (Animate On Scroll).
- **Totalmente responsivo** — mobile, tablet y desktop.
- **Accesible** — roles ARIA, navegación por teclado, soporte `prefers-reduced-motion`.

## Estructura del Proyecto

```
weeding-invite/
├── index.html              # Página principal (todos los contenidos)
├── planeacion.txt          # Documento de planeación técnica del proyecto
├── css/
│   ├── styles.css          # Tokens de diseño, layout, tipografía y secciones
│   ├── envelope.css        # Animaciones del sobre y sello de cera
│   └── animations.css      # Hero entrance, AOS overrides, lightbox, digit flip
├── js/
│   ├── countdown.js        # Timer de cuenta regresiva en tiempo real
│   ├── envelope.js         # Timeline GSAP de apertura del sobre
│   └── main.js             # AOS init, galería lightbox, smooth scroll
└── assets/
    └── images/             # Fotos de la pareja (ver sección de personalización)
```

## Cómo Ejecutar el Proyecto

### Opción 1 — Abrir directo en el navegador (más simple)

```bash
# Clona el repositorio
git clone git@github.com:katorres02/weeding-invite.git
cd weeding-invite

# Abre index.html en tu navegador preferido
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

> **Nota:** La mayoría de funciones funcionan con `file://` directo. El iframe de Google Maps requiere un servidor local (ver opción 2).

---

### Opción 2 — Servidor local (recomendado para desarrollo)

**Con Python (sin instalar nada extra):**

```bash
git clone git@github.com:katorres02/weeding-invite.git
cd weeding-invite

# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Luego abre `http://localhost:8080` en el navegador.

---

**Con Node.js (si tienes npx disponible):**

```bash
cd weeding-invite
npx serve .
```

Luego abre la URL que muestra en consola (normalmente `http://localhost:3000`).

---

**Con VS Code — extensión Live Server:**

1. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code.
2. Abre la carpeta `weeding-invite` en VS Code.
3. Clic derecho en `index.html` → **Open with Live Server**.
4. El navegador se abre automáticamente en `http://127.0.0.1:5500`.

---

## Personalización — Placeholders a Reemplazar

Antes de publicar el sitio, reemplaza los siguientes valores en `index.html` y `js/countdown.js`:

### En `index.html`

| Placeholder | Descripción | Ejemplo |
|---|---|---|
| `COUPLE_NAME_1` | Nombre del novio/novia 1 | `Carlos` |
| `COUPLE_NAME_2` | Nombre del novio/novia 2 | `Sofía` |
| `WEDDING_DATE_DISPLAY` | Fecha en formato legible | `Sábado, 14 de Febrero de 2026` |
| `WEDDING_TIME` | Hora del evento | `17:00 hrs` |
| `VENUE_NAME` | Nombre del lugar | `Hacienda San Ángel` |
| `VENUE_ADDRESS` | Dirección completa | `Calle Principal 123, CDMX` |
| `VENUE_MAPS_EMBED_URL` | URL del iframe de Google Maps | ver instrucciones abajo |
| `GOOGLE_FORM_URL` | Link al Google Form de RSVP | ver instrucciones abajo |
| `GIFT_REGISTRY_URL` | Link a la mesa de regalos | URL de Liverpool, Amazon, etc. |
| `DRESS_CODE_LABEL` | Etiqueta del código de vestimenta | `Formal` |
| `DRESS_CODE_DESCRIPTION` | Descripción del código | `Caballeros: traje oscuro...` |
| `STORY_TEXT` | Párrafo "Nuestra Historia" | texto libre |
| `RSVP_DEADLINE` | Fecha límite para confirmar | `Confirma antes del 1 de febrero` |
| `WAX_SEAL_MONOGRAM` | Iniciales en el sello de cera | `CS` |

### En `js/countdown.js` (línea 6)

```js
const WEDDING_DATE = new Date('WEDDING_DATE_ISO');
// Reemplaza WEDDING_DATE_ISO por la fecha en formato ISO 8601:
const WEDDING_DATE = new Date('2026-02-14T17:00:00');
```

---

### Cómo obtener la URL del iframe de Google Maps

1. Ve a [maps.google.com](https://maps.google.com)
2. Busca la dirección del venue
3. Clic en **Compartir** → **Incorporar un mapa** → **Copiar HTML**
4. Del código copiado, extrae el valor del atributo `src="..."` del `<iframe>`
5. Pega esa URL en el placeholder `VENUE_MAPS_EMBED_URL` dentro del `<iframe>` en `index.html`

---

### Cómo crear el Google Form de RSVP

1. Ve a [forms.google.com](https://forms.google.com) y crea un formulario nuevo
2. Campos sugeridos:
   - Nombre completo *(texto corto, obligatorio)*
   - ¿Asistirás? *(opción múltiple: Sí / No)*
   - Número de personas *(numérico)*
   - Restricciones alimentarias *(texto corto, opcional)*
   - Mensaje para los novios *(párrafo, opcional)*
3. En la pestaña **Respuestas** → clic en el ícono de Google Sheets para vincular una hoja de cálculo
4. Clic en **Enviar** → ícono de cadena → copia el link
5. Pega el link en el placeholder `GOOGLE_FORM_URL` en `index.html`

---

### Fotos de la pareja

Coloca las fotos en `assets/images/` con estos nombres exactos:

| Archivo | Uso | Recomendación |
|---|---|---|
| `photo-1.jpg` | Foto principal (ocupa 2 columnas) | Horizontal, 1200×800px, < 500KB |
| `photo-2.jpg` | Foto 2 | Cualquier orientación, < 500KB |
| `photo-3.jpg` | Foto 3 | Cualquier orientación, < 500KB |
| `photo-4.jpg` | Foto 4 | Cualquier orientación, < 500KB |
| `photo-5.jpg` | Foto 5 | Cualquier orientación, < 500KB |

---

## Publicar el Sitio (Deploy)

### Netlify (recomendado — gratis)

1. Ve a [netlify.com](https://netlify.com) e inicia sesión
2. **Add new site** → **Deploy manually**
3. Arrastra la carpeta `weeding-invite` completa al área de deploy
4. El sitio queda publicado en una URL tipo `https://nombre-random.netlify.app`
5. Opcional: cambia el nombre en **Site settings** → **Site details** → **Change site name**
6. Opcional: conecta un dominio propio en **Domain management**

### GitHub Pages (gratis, ya tienes el repo)

1. En el repo de GitHub, ve a **Settings** → **Pages**
2. En **Source** selecciona: Branch `main`, carpeta `/ (root)`
3. Clic en **Save**
4. El sitio queda en `https://katorres02.github.io/weeding-invite`

---

## Dependencias (CDN — sin instalación)

| Librería | Versión | Uso |
|---|---|---|
| [GSAP](https://gsap.com) | 3.12.5 | Animación de apertura del sobre |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.4 | Animaciones al hacer scroll |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | — | Tipografía serif (títulos) |
| [Montserrat](https://fonts.google.com/specimen/Montserrat) | — | Tipografía sans-serif (cuerpo) |
