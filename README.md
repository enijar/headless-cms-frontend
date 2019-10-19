# Headless CMS Frontend

Headless CMS UI, components, and design.

### Quick Start (Development)

```shell
cp .env.example .env
npm install
npm run watch
npm run test-watch # optional
```

Open [localhost:8080](http://localhost:8080) in your browser.

### Quick Start (Production)

```shell
cp .env.example .env
```

Set `APP_ENV=production` inside `.env` file.

```shell
npm install
npm run build
npm test # confirm tests are passing
```

All files will be compiled to the `build` directory.
