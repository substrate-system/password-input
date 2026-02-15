# Password Input
![tests](https://github.com/substrate-system/password-input/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/password-input?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@bicycle-codes/keys?cache-control=no-cache)](https://packagephobia.com/result?p=@bicycle-codes/keys)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40substrate-system%2Fpassword-input%2Fes2022%2Ffile.mjs?style=flat-square&compression=gzip)](https://esm.sh/@substrate-system/password-input/es2022/password-input.mjs)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


A password input with less style. See [password-field](https://github.com/substrate-system/password-field)
for a little bit more style.

[See a live demo](https://substrate-system.github.io/password-input/)

<details><summary><h2>Contents</h2></summary>
<!-- toc -->
</details>

## Install

```sh
npm i -S @substrate-system/password-input
```

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import { PasswordInput } from '@substrate-system/password-input'
```

### Common JS
```js
require('@substrate-system/password-input')
```

## CSS

### Import CSS

```js
import '@substrate-system/password-input/css'
```

Or minified:
```js
import '@substrate-system/password-input/min/css'
```

### Customize CSS via some variables

```css
password-input {
    --example: pink;
}
```

## Use

This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### JS
```js
import '@substrate-system/password-input'
```

### HTML
```html
<div>
    <password-input></password-input>
</div>
```

### pre-built
This package exposes minified JS and CSS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/password-input/dist/index.min.js ./public/password-input.min.js
cp ./node_modules/@substrate-system/password-input/dist/style.min.css ./public/password-input.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./password-input.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./password-input.min.js"></script>
</body>
```
