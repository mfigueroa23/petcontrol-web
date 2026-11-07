# Control de Mascotas - Frontend

Proyecto web en agular orientado al control de mascotas utilizando API Rest
para la comunicacion con el backend.

## Comandos

- Iniciar servidor de desarrollo: `ng serve`
- Ejecutar pruebas unitarias: `ng test`
- Ejecutar pruebas de sistema con Playwright (requiere el contenedor web en el puerto 8080): `pnpm e2e`
- Revisar el código con ESLint: `ng lint`
- Aplicar o comprobar el formato con Prettier: `pnpm format` / `pnpm format:check`

## Reglas de desarollo

- Codigo fuente en ingles, mensajes y textos en español.
- No trabajar en la rama `main`, crear una rama con el nombre de la tarea a realizar `<type>/<JIRA-TICKET-KEY>-<tarea>`.
- Trabajo en pair programming: cada tarea se divide en pasos minimos verificables.
  Claude realiza un paso y se detiene para que el desarrollador lo revise; si lo aprueba
  se hace commit y se pasa al siguiente, de lo contrario se itera sobre el mismo paso
  hasta que quede aprobado. No se hace commit ni se avanza sin aprobacion explicita.
- Tickets de desarrollo en JIRA el proyecto con clave `CDM`
- Documentacion (SRS, SDD y TD) en Confluence con la clave `CDM`.
- Estructura del proyecto:
  - `src/app/components`: Componentes reutilizables de la aplicacion.
  - `src/app/pages`: Paginas de la aplicacion.
  - `src/app/services`: Servicios de la aplicacion.
  - `src/app/interfaces`: Contratos de la API Rest.

## Al finalizar una tarea de desarrollo

- Comprobar que los test unitarios pasen correctamente.
- Realizar commit si se solicita siguiendo la convencion (sin agregar `co-autored` de claude-code):

```
<type>(<scope>): [<JIRA-TICKET-KEY>] <subject>

<Descripcion breve de los cambios realizados>

Cambios realizados:
- <Archvo modificado>: <Descripcion de los cambios realizados>
- ...
```

## Al solicitar un pull request

- Comprobar que los test unitarios pasen correctamente.
- Realizar un bump de version en el archivo `package.json` siguiendo la convencion de
  [SemVer](https://semver.org/) con su respectivo commit siguiendo la convencion.
- Abrir un pull request en Github con `gh pr create` siguiendo la convencion (sin agregar `co-autored` de claude-code):

```
<type>(<scope>): [<JIRA-TICKET-KEY>] <subject>

Objetivo:
<Description breve de los cambios realizados>

Cambios realizados:
- <Archvo modificado>: <Descripcion de los cambios realizados>
- ...

Impacto:
<Descripcion del impacto de los cambios realizados>

Pruebas realizadas:
- <Descripcion de las pruebas realizadas>
- ...
```
