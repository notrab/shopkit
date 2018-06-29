# @moltin/react-shopkit

[![CircleCI](https://circleci.com/gh/moltin/shopkit.svg?style=svg)](https://circleci.com/gh/moltin/shopkit) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![npm version](https://img.shields.io/npm/v/@moltin/react-shopkit.svg)](https://www.npmjs.com/package/@moltin/react-shopkit) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 🛠 Installation

Install the package from [npm](https://www.npmjs.com/package/@moltin/react-shopkit) inside your React project.

```bash
yarn add @moltin/react-shopkit
```

You'll now want to wrap your React project with the Shopkit provider.

```js
import { Shopkit as ShopkitProvider } from '@moltin/shopkit-react'
​
ReactDOM.render(
  <ShopkitProvider clientId='INSERT_CLIENT_ID'>
    <App />
  </ShopkitProvider>,
  document.querySelector('#root')
)
```
