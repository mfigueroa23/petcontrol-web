import { expect, test } from '@playwright/test';

test.describe('Prueba de humo del contenedor web', () => {
  test('la ruta de salud responde ok', async ({ request }) => {
    const response = await request.get('/healthz');

    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('ok');
  });

  test('la página de inicio carga la aplicación sin errores', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    const response = await page.goto('/');

    expect(response?.status()).toBe(200);
    await expect(page.locator('app-root h1')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('una ruta de la aplicación sin archivo devuelve la aplicación', async ({ page }) => {
    const response = await page.goto('/ruta/inexistente');

    expect(response?.status()).toBe(200);
    await expect(page.locator('app-root')).toBeAttached();
  });

  test('un archivo estático inexistente devuelve 404', async ({ request }) => {
    const response = await request.get('/main-ZZZZZZZZ.js');

    expect(response.status()).toBe(404);
  });
});
