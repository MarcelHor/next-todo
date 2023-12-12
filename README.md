# NEXT-TODO

Chtěl jsem se naučit javascript fullstack framework a vyzkoušet statické generování, protože vždy pracuju v prostředí
backend/frontend.

## Funkcionality

- registrace uživatele
- přihlášení uživatele - pomocí emailu a hesla nebo pomocí githubu
- vytváření a smazání listů todo - každý list může mít několik položek todo
- vytváření, editace a smazání todo položek v listu
- dark/light mode

## Zabezpečení

- session cookie
- csrf token
- prisma client - sql injection
- heslo je hashováno pomocí bcrypt

## Testování

Otestoval jsem si logiku v todo controllerech.

- `npm run test` - spustí testy
- `npm run test -- --coverage` - spustí testy a vygeneruje coverage report

## Test Coverage Report

| File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|--------------------------|---------|----------|---------|---------|-------------------|
| All files                | 94.91   | 85.18    | 100     | 93.33   |                   |
| app/api/auth/register    | 100     | 100      | 100     | 100     |                   |
| registerController.ts    | 100     | 100      | 100     | 100     |                   |
| app/api/todo-list/[todo] | 97.05   | 84.61    | 100     | 95.74   |                   |
| todoController.ts        | 97.05   | 84.61    | 100     | 95.74   | 60,90             |
| utils                    | 87.09   | 83.33    | 100     | 85.18   |                   |
| ApiError.ts              | 100     | 50       | 100     | 100     | 3                 |
| userSession.ts           | 83.33   | 90       | 100     | 80.95   | 25-26,40-41       |

## Instalace

- `npm install`
- `npm run dev` - spustí dev server
- `npm run build` - vygeneruje produkční build
- `npm run start` - spustí produkční build

- Musí se nastavit .env soubory a databáze!

## Demo

- https://next-todo-red.vercel.app/ - demo
- https://next-todo-red.vercel.app/dashboard/ - v dashboardu a v listech jsou tlačítka na json výstupy
- https://next-todo-red.vercel.app/api/todo-list/4 - příklad JSON výstupu
- https://next-todo-red.vercel.app/login - pro zobrazení json výstupu je potřeba být přihlášený!

## Zdrojové kódy
- https://github.com/MarcelHor/next-todo