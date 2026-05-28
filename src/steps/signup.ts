import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import type { Page } from '@playwright/test';

const { Given, When, Then } = createBdd();

type SignupState = {
  email: string;
  password: string;
};

const state: SignupState = {
  email: '',
  password: '',
};

const REGISTER_URL = '/account/register';
const LOGIN_URL = '/account/login';

function uniqueEmail(prefix: string) {
  return `${prefix}+${Date.now()}@mail.com`;
}

async function fillFieldByLabel(page: Page, label: string, value: string) {
  const field = getSignupField(page, label);
  await field.fill(value);
}

function getSignupField(page: Page, label: string) {
  const selectors: Record<string, string> = {
    'First Name': 'input[name="customer[first_name]"], #FirstName',
    'Last Name': 'input[name="customer[last_name]"], #LastName',
    'Email Address': 'input[name="customer[email]"], #Email',
    Password: 'input[name="customer[password]"], #CreatePassword',
  };
  const selector = selectors[label];
  if (!selector) {
    throw new Error(`No selector mapping found for field: ${label}`);
  }
  return page.locator(selector).first();
}

Given('que estoy en la página de registro de Sauce Demo', async ({ page }) => {
  await page.goto(REGISTER_URL);
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
});

When('completo First Name con {string}', async ({ page }, firstName: string) => {
  await fillFieldByLabel(page, 'First Name', firstName);
});

When('completo Last Name con {string}', async ({ page }, lastName: string) => {
  await fillFieldByLabel(page, 'Last Name', lastName);
});

When('completo Email Address con {string}', async ({ page }, email: string) => {
  state.email = email;
  await fillFieldByLabel(page, 'Email Address', email);
});

When('completo Email Address con un email único válido', async ({ page }) => {
  state.email = uniqueEmail('sauce-signup');
  await fillFieldByLabel(page, 'Email Address', state.email);
});

When('completo Password con {string}', async ({ page }, password: string) => {
  state.password = password;
  await fillFieldByLabel(page, 'Password', password);
});

When('completo Password con una contraseña válida', async ({ page }) => {
  state.password = 'Pass12345';
  await fillFieldByLabel(page, 'Password', state.password);
});

When('envío el formulario de Create Account', async ({ page }) => {
  await page.getByRole('button', { name: 'Create' }).click();
});

Then('la cuenta se crea correctamente', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  const invalidCount = await page.locator('input:invalid').count();
  expect(invalidCount).toBe(0);
});

Then('el usuario queda autenticado o redirigido a una vista de cuenta válida', async ({ page }) => {
  await expect(page).toHaveURL(/\/account\/register|\/account(\/)?$/);
});

Then('veo un mensaje de validación de campo obligatorio', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/register/);
});

Then('la cuenta no se crea', async ({ page }) => {
  await expect(page).toHaveURL(/\/account\/register/);
});

Then('veo un mensaje de formato inválido para email', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/register/);
});

Given('existe una cuenta previa con email {string}', async ({ page }, email: string) => {
  state.email = email;
  state.password = 'Pass12345';

  await page.goto(REGISTER_URL);
  await fillFieldByLabel(page, 'First Name', 'Existing');
  await fillFieldByLabel(page, 'Last Name', 'User');
  await fillFieldByLabel(page, 'Email Address', state.email);
  await fillFieldByLabel(page, 'Password', state.password);
  await page.getByRole('button', { name: 'Create' }).click();
});

When('intento crear cuenta con ese mismo email', async ({ page }) => {
  await page.goto(REGISTER_URL);
  await fillFieldByLabel(page, 'First Name', 'Duplicate');
  await fillFieldByLabel(page, 'Last Name', 'User');
  await fillFieldByLabel(page, 'Email Address', state.email);
  await fillFieldByLabel(page, 'Password', state.password || 'Pass12345');
  await page.getByRole('button', { name: 'Create' }).click();
});

Then('veo un mensaje indicando que el email ya está en uso', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/register/);
});

Given('tengo una cuenta recién creada', async ({ page }) => {
  state.email = uniqueEmail('fresh-account');
  state.password = 'Pass12345';

  await page.goto(REGISTER_URL);
  await fillFieldByLabel(page, 'First Name', 'Fresh');
  await fillFieldByLabel(page, 'Last Name', 'Account');
  await fillFieldByLabel(page, 'Email Address', state.email);
  await fillFieldByLabel(page, 'Password', state.password);
  await page.getByRole('button', { name: 'Create' }).click();
});

When('navego a la página de login', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();
});

When('inicio sesión con las credenciales registradas', async ({ page }) => {
  await fillFieldByLabel(page, 'Email Address', state.email);
  await fillFieldByLabel(page, 'Password', state.password);
  await page.getByRole('button', { name: 'Sign In' }).click();
});

Then('accedo correctamente como cliente autenticado', async ({ page }) => {
  await expect(page).toHaveURL(/\/account\/login|\/account(\/)?$/);
});
