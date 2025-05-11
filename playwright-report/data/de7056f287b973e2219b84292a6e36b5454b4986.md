# Test info

- Name: Rejestracja użytkownika >> powinien pomyślnie zarejestrować nowego użytkownika
- Location: /Users/konrad/Facebook/appreact/e2e/registration.spec.js:5:3

# Error details

```
Error: Timed out 15000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('button', { name: /utwórz nowe konto|zarejestruj się/i })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 15000ms
  - waiting for getByRole('button', { name: /utwórz nowe konto|zarejestruj się/i })

    at /Users/konrad/Facebook/appreact/e2e/registration.spec.js:20:41
```

# Page snapshot

```yaml
- text: Facebook helps you connect and share with the people in your life.
- textbox "Email address or phone number"
- textbox "Password"
- button "Log In"
- link "Forgotten password?":
  - /url: /reset
- button "Create Account"
- link "Create a Page for a celebrity, brand or business.":
  - /url: /
- link "English(UK)":
  - /url: /
  - paragraph: English(UK)
- link "Français(FR)":
  - /url: /
  - paragraph: Français(FR)
- link "العربية":
  - /url: /
  - paragraph: العربية
- link "ⵜⴰⵎⴰⵣⵉⵖⵜ":
  - /url: /
  - paragraph: ⵜⴰⵎⴰⵣⵉⵖⵜ
- link "Español (España)":
  - /url: /
  - paragraph: Español (España)
- link "italiano":
  - /url: /
  - paragraph: italiano
- link "Deutsch":
  - /url: /
  - paragraph: Deutsch
- link "Português (Brasil)":
  - /url: /
  - paragraph: Português (Brasil)
- link "हिन्दी":
  - /url: /
  - paragraph: हिन्दी
- link "中文(简体)":
  - /url: /
  - paragraph: 中文(简体)
- link "日本語":
  - /url: /
  - paragraph: 日本語
- link:
  - /url: /
- link "Sign Up":
  - /url: /
  - paragraph: Sign Up
- link "Log in":
  - /url: /
  - paragraph: Log in
- link "Messenger":
  - /url: /
  - paragraph: Messenger
- link "Facebook Lite":
  - /url: /
  - paragraph: Facebook Lite
- link "Watch":
  - /url: /
  - paragraph: Watch
- link "Places":
  - /url: /
  - paragraph: Places
- link "Games":
  - /url: /
  - paragraph: Games
- link "Marketplace":
  - /url: /
  - paragraph: Marketplace
- link "Facebook Pay":
  - /url: /
  - paragraph: Facebook Pay
- link "Oculus":
  - /url: /
  - paragraph: Oculus
- link "Portal":
  - /url: /
  - paragraph: Portal
- link "Instagram":
  - /url: /
  - paragraph: Instagram
- link "Bulletin":
  - /url: /
  - paragraph: Bulletin
- link "Local":
  - /url: /
  - paragraph: Local
- link "Fundraisers":
  - /url: /
  - paragraph: Fundraisers
- link "Services":
  - /url: /
  - paragraph: Services
- link "Voting Information Centre":
  - /url: /
  - paragraph: Voting Information Centre
- link "Groups":
  - /url: /
  - paragraph: Groups
- link "About":
  - /url: /
  - paragraph: About
- link "Create ad":
  - /url: /
  - paragraph: Create ad
- link "Create Page":
  - /url: /
  - paragraph: Create Page
- link "Developers":
  - /url: /
  - paragraph: Developers
- link "Careers":
  - /url: /
  - paragraph: Careers
- link "Privacy":
  - /url: /
  - paragraph: Privacy
- link "Cookies":
  - /url: /
  - paragraph: Cookies
- link "AdChoices":
  - /url: /
  - paragraph: AdChoices
- link "Terms":
  - /url: /
  - paragraph: Terms
- link "Help":
  - /url: /
  - paragraph: Help
- paragraph: Meta © 2023
```

# Test source

```ts
   1 | // @ts-check
   2 | const { test, expect } = require('@playwright/test');
   3 |
   4 | test.describe('Rejestracja użytkownika', () => {
   5 |   test('powinien pomyślnie zarejestrować nowego użytkownika', async ({
   6 |     page,
   7 |   }) => {
   8 |     // Krok 1: Nawigacja do strony głównej
   9 |     await page.goto('/'); // Zakładając, że baseURL to 'http://localhost:3000' z playwright.config.js
   10 |     await page.waitForLoadState('networkidle'); // Czekaj na załadowanie strony
   11 |
   12 |     // Krok 2: Otwarcie formularza rejestracji
   13 |     // W formularzu jest używany data-testid="register-form", ale potrzebujemy przycisk
   14 |     try {
   15 |       // Znajdź przycisk, który otwiera formularz rejestracji
   16 |       // Możemy musieć poszukać innych selektorów, w zależności od strony głównej
   17 |       const createAccountButton = await page.getByRole('button', {
   18 |         name: /utwórz nowe konto|zarejestruj się/i,
   19 |       });
>  20 |       await expect(createAccountButton).toBeVisible({ timeout: 15000 });
      |                                         ^ Error: Timed out 15000ms waiting for expect(locator).toBeVisible()
   21 |       await createAccountButton.click();
   22 |     } catch (error) {
   23 |       console.error(
   24 |         'Błąd podczas klikania przycisku "Utwórz nowe konto":',
   25 |         error,
   26 |       );
   27 |       await page.screenshot({
   28 |         path: 'e2e/screenshots/error_create_account_button.png',
   29 |       });
   30 |       throw error;
   31 |     }
   32 |
   33 |     // Krok 3: Oczekiwanie na pojawienie się formularza rejestracji
   34 |     const registerForm = page.locator('[data-testid="register-form"]');
   35 |     await expect(registerForm).toBeVisible({ timeout: 10000 });
   36 |
   37 |     // Weryfikacja nagłówka formularza
   38 |     await expect(
   39 |       page.locator('.register_header').getByText('Zarejestruj się'),
   40 |     ).toBeVisible();
   41 |     await expect(
   42 |       page.locator('.register_header').getByText('to szybkie i łatwe'),
   43 |     ).toBeVisible();
   44 |
   45 |     // Krok 4: Wypełnienie formularza
   46 |     // Używamy właściwych nazw pól na podstawie kodu komponentu RegisterForm
   47 |     await page.getByPlaceholder('Imię').fill('Tester');
   48 |     await page.getByPlaceholder('Nazwisko').fill('Playwrightowy');
   49 |     await page
   50 |       .getByPlaceholder('Adres email')
   51 |       .fill('tester.playwright@example.com');
   52 |     await page.getByPlaceholder('Nowe hasło').fill('TestoweHaslo123!');
   53 |
   54 |     // Wybór daty urodzenia
   55 |     const currentYear = new Date().getFullYear();
   56 |     await page.locator('select[name="bDay"]').selectOption('15');
   57 |     await page.locator('select[name="bMonth"]').selectOption({ index: 5 }); // Czerwiec (0-indexed)
   58 |     await page
   59 |       .locator('select[name="bYear"]')
   60 |       .selectOption((currentYear - 25).toString());
   61 |
   62 |     // Wybór płci - używamy selektorów zgodnych z komponentem GenderSelect
   63 |     // Bazując na typowym układzie formularzy płci, prawdopodobnie używa radio buttonów
   64 |     await page.locator('input[name="gender"][value="male"]').check();
   65 |     // Jeśli powyższy selektor nie działa, możemy potrzebować sprawdzić dokładną implementację GenderSelect
   66 |
   67 |     // Krok 5: Kliknięcie przycisku "Zarejestruj się" w formularzu
   68 |     await page.locator('button.blue_btn.open_signup').click();
   69 |
   70 |     // Krok 6: Weryfikacja sukcesu rejestracji
   71 |
   72 |     // Sprawdzamy, czy loader jest widoczny (jeśli aplikacja używa loadera podczas rejestracji)
   73 |     await expect(page.locator('.register_form .dot-loader')).toBeVisible({
   74 |       timeout: 5000,
   75 |     });
   76 |
   77 |     // Czekamy na sukces - może to być komunikat sukcesu lub zniknięcie formularza
   78 |     try {
   79 |       // Sprawdzamy, czy pojawił się komunikat o sukcesie
   80 |       await expect(page.locator('.success_text')).toBeVisible({
   81 |         timeout: 15000,
   82 |       });
   83 |     } catch {
   84 |       // Alternatywnie, formularz mógł zniknąć po udanej rejestracji
   85 |       await expect(registerForm).not.toBeVisible({ timeout: 15000 });
   86 |     }
   87 |
   88 |     // Weryfikacja przekierowania lub innych efektów udanej rejestracji
   89 |     // Możemy sprawdzić URL, jeśli aplikacja przekierowuje po rejestracji
   90 |     // lub sprawdzić elementy interfejsu dla zalogowanego użytkownika
   91 |
   92 |     // Przykładowe dodatkowe asercje:
   93 |     // 1. Sprawdzenie, czy użytkownik został przekierowany
   94 |     // await expect(page).not.toHaveURL('/'); // Zakładając, że użytkownik nie pozostaje na stronie głównej
   95 |
   96 |     // 2. Sprawdzenie, czy pojawił się element widoczny tylko dla zalogowanych użytkowników
   97 |     // await expect(page.locator('.user_profile')).toBeVisible({ timeout: 10000 });
   98 |   });
   99 | });
  100 |
```