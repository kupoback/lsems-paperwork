# LSEMS AMU Paperwork Generator

This is a paperwork generator for a GTA 5 RP server for use of the Los Santos Emergency Medical Services Department. The means of this is to output BBCode for posting to the website that this is used on. The project is setup to use TypeScript, but isn't using it at this time.

Project uses [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable), but feel free to use `npm` if you wish. Just do not commit the `package-lock.json` file

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

#### Copy the env file. You'll need to populate the secret key for yourself

```sh
cp .env.example .env
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
