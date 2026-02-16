# Password Input
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/password-input/nodejs.yml?style=flat-square)](https://github.com/substrate-system/password-input/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/password-input?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@bicycle-codes/keys?cache-control=no-cache)](https://packagephobia.com/result?p=@bicycle-codes/keys)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40substrate-system%2Fpassword-input%2Fes2022%2Ffile.mjs?style=flat-square&compression=gzip)](https://esm.sh/@substrate-system/password-input/es2022/password-input.mjs)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


A password input with less style than
[password-field](https://github.com/substrate-system/password-field).

Accessible by default &mdash; `aria-*` attributes, the `id` attribute, and a
`label` attribute, if present, are all handled correctly.


[See a live demo](https://substrate-system.github.io/password-input/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [API](#api)
  * [ESM](#esm)
  * [Common JS](#common-js)
- [Use](#use)
  * [JS](#js)
  * [HTML](#html)
  * [pre-built](#pre-built)
- [CSS](#css)
  * [Import CSS](#import-css)
- [Notes](#notes)
  * [`ignoredAriaCallbackNames` property](#ignoredariacallbacknames-property)

<!-- tocstop -->

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

---

## CSS

### Import CSS

```js
import '@substrate-system/password-input/css'
```

Or minified:
```js
import '@substrate-system/password-input/min/css'
```

---

## Notes

Implementation notes.

### `ignoredAriaCallbackNames` property

1. You set an `aria-*` attribute on `<password-input>`.
2. `attributeChangedCallback` routes to `handleChange_aria` (index.ts (line 105)).
3. `handleChange_aria` copies that value to the inner `<input>`
   (index.ts (line 189)).
4. Then it removes the same `aria-*` from the host (index.ts (line 194))
   so host stays clean.
5. That removal triggers `attributeChangedCallback` again with
   `newValue === null`.
6. The guard sees the name in `ignoredAriaCallbackNames`, deletes it, and
   returns early (index.ts (line 178)),
   so it does not remove the attribute from the input/cache.


Without this guard, the second callback would treat the host removal as a
real “delete” request and clear the input attribute you just transferred.

