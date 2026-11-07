# Control de Mascotas - Web

Aplicación web en Angular de Control de Mascotas. Se comunica con `petcontrol-api`
mediante su API REST y se publica como una imagen de Nginx que sirve archivos
estáticos (SDD 5.5).

## Requisitos

- Node.js 26
- pnpm 12 (versión fijada en el campo `packageManager` de `package.json`)
- Docker, para construir la imagen y ejecutar las pruebas de sistema

## Comandos

| Comando        | Descripción                                                       |
| -------------- | ----------------------------------------------------------------- |
| `pnpm install` | Instala las dependencias.                                         |
| `pnpm start`   | Servidor de desarrollo en `http://localhost:4200/`.               |
| `pnpm build`   | Compila la aplicación en `dist/web/browser`.                      |
| `pnpm test`    | Pruebas unitarias con Vitest.                                     |
| `pnpm lint`    | Revisa el código con ESLint.                                      |
| `pnpm format`  | Aplica el formato de Prettier (`pnpm format:check` lo comprueba). |
| `pnpm e2e`     | Pruebas de sistema con Playwright contra el contenedor web.       |

## Imagen Docker

El `Dockerfile` compila la aplicación con Node y pnpm, y la sirve con
`nginxinc/nginx-unprivileged`, sin privilegios de root, en el puerto `8080`.

```bash
docker build -t petcontrol-web:local .
docker run --rm -p 8080:8080 petcontrol-web:local
```

`nginx.conf` devuelve `index.html` en las rutas de Angular, expone la ruta de
salud `/healthz` y guarda en caché por un año solo los archivos con hash en el
nombre.

## Pruebas de sistema

Las pruebas de `e2e/` se ejecutan con Playwright contra el contenedor web, en
Chrome, Edge, Firefox, WebKit y a 360 px de ancho (REQ-NF-006 y REQ-NF-007).

```bash
docker run -d --rm -p 8080:8080 petcontrol-web:local
pnpm exec playwright install chromium firefox webkit   # solo la primera vez
pnpm e2e --project=chromium --project=firefox --project=webkit --project=mobile-360
```

Para usar otra instancia, define `E2E_BASE_URL` (por defecto `http://localhost:8080`).
El proyecto `msedge` requiere Microsoft Edge instalado (`pnpm exec playwright install msedge`).

## Integración continua

El pipeline `.github/workflows/ci.yml` (CDM-3, SDD 5.4) se ejecuta en cada PR
hacia `main` y en cada push a `main`:

| Job       | Descripción                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `version` | Lee la versión de `package.json` y falla si ya está publicada en Docker Hub. Cada PR debe subir la versión.                      |
| `quality` | Comprueba el formato, revisa el código y ejecuta las pruebas unitarias.                                                          |
| `e2e`     | Construye la imagen, levanta el contenedor y ejecuta Playwright en todos los navegadores. Guarda el reporte como artefacto.      |
| `publish` | Solo en push a `main` y si los demás jobs se aprueban: publica la misma imagen probada con las etiquetas `<versión>` y `latest`. |

Secretos requeridos en el repositorio de GitHub:

| Secreto                  | Uso                                                     |
| ------------------------ | ------------------------------------------------------- |
| `DOCKERHUB_USERNAME`     | Usuario de Docker Hub.                                  |
| `DOCKERHUB_TOKEN`        | Token de acceso de Docker Hub con permiso de escritura. |
| `DOCKERHUB_ORGANIZATION` | Organización donde se publica `petcontrol-web`.         |

El despliegue en el servidor mediante Twingate se configura en CDM-29.

## Flujo de trabajo

Las reglas de desarrollo, ramas, commits y pull requests están en [AGENTS.md](AGENTS.md).
