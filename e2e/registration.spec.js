// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Rejestracja użytkownika', () => {
  test('powinien pomyślnie zarejestrować nowego użytkownika', async ({
    page,
  }) => {
    // Krok 1: Nawigacja do strony głównej
    await page.goto('/'); // Zakładając, że baseURL to 'http://localhost:3000' z playwright.config.js
    await page.waitForLoadState('networkidle'); // Czekaj na załadowanie strony

    // Krok 2: Otwarcie formularza rejestracji
    // W formularzu jest używany data-testid="register-form", ale potrzebujemy przycisk
    try {
      // Znajdź przycisk, który otwiera formularz rejestracji
      // Możemy musieć poszukać innych selektorów, w zależności od strony głównej
      const createAccountButton = await page.getByRole('button', {
        name: /utwórz nowe konto|zarejestruj się/i,
      });
      await expect(createAccountButton).toBeVisible({ timeout: 15000 });
      await createAccountButton.click();
    } catch (error) {
      console.error(
        'Błąd podczas klikania przycisku "Utwórz nowe konto":',
        error,
      );
      await page.screenshot({
        path: 'e2e/screenshots/error_create_account_button.png',
      });
      throw error;
    }

    // Krok 3: Oczekiwanie na pojawienie się formularza rejestracji
    const registerForm = page.locator('[data-testid="register-form"]');
    await expect(registerForm).toBeVisible({ timeout: 10000 });

    // Weryfikacja nagłówka formularza
    await expect(
      page.locator('.register_header').getByText('Zarejestruj się'),
    ).toBeVisible();
    await expect(
      page.locator('.register_header').getByText('to szybkie i łatwe'),
    ).toBeVisible();

    // Krok 4: Wypełnienie formularza
    // Używamy właściwych nazw pól na podstawie kodu komponentu RegisterForm
    await page.getByPlaceholder('Imię').fill('Tester');
    await page.getByPlaceholder('Nazwisko').fill('Playwrightowy');
    await page
      .getByPlaceholder('Adres email')
      .fill('tester.playwright@example.com');
    await page.getByPlaceholder('Nowe hasło').fill('TestoweHaslo123!');

    // Wybór daty urodzenia
    const currentYear = new Date().getFullYear();
    await page.locator('select[name="bDay"]').selectOption('15');
    await page.locator('select[name="bMonth"]').selectOption({ index: 5 }); // Czerwiec (0-indexed)
    await page
      .locator('select[name="bYear"]')
      .selectOption((currentYear - 25).toString());

    // Wybór płci - używamy selektorów zgodnych z komponentem GenderSelect
    // Bazując na typowym układzie formularzy płci, prawdopodobnie używa radio buttonów
    await page.locator('input[name="gender"][value="male"]').check();
    // Jeśli powyższy selektor nie działa, możemy potrzebować sprawdzić dokładną implementację GenderSelect

    // Krok 5: Kliknięcie przycisku "Zarejestruj się" w formularzu
    await page.locator('button.blue_btn.open_signup').click();

    // Krok 6: Weryfikacja sukcesu rejestracji

    // Sprawdzamy, czy loader jest widoczny (jeśli aplikacja używa loadera podczas rejestracji)
    await expect(page.locator('.register_form .dot-loader')).toBeVisible({
      timeout: 5000,
    });

    // Czekamy na sukces - może to być komunikat sukcesu lub zniknięcie formularza
    try {
      // Sprawdzamy, czy pojawił się komunikat o sukcesie
      await expect(page.locator('.success_text')).toBeVisible({
        timeout: 15000,
      });
    } catch {
      // Alternatywnie, formularz mógł zniknąć po udanej rejestracji
      await expect(registerForm).not.toBeVisible({ timeout: 15000 });
    }

    // Weryfikacja przekierowania lub innych efektów udanej rejestracji
    // Możemy sprawdzić URL, jeśli aplikacja przekierowuje po rejestracji
    // lub sprawdzić elementy interfejsu dla zalogowanego użytkownika

    // Przykładowe dodatkowe asercje:
    // 1. Sprawdzenie, czy użytkownik został przekierowany
    // await expect(page).not.toHaveURL('/'); // Zakładając, że użytkownik nie pozostaje na stronie głównej

    // 2. Sprawdzenie, czy pojawił się element widoczny tylko dla zalogowanych użytkowników
    // await expect(page.locator('.user_profile')).toBeVisible({ timeout: 10000 });
  });
});
