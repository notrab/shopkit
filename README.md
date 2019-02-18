# @moltin/react-shopkit

[![CircleCI](https://circleci.com/gh/moltin/shopkit.svg?style=svg)](https://circleci.com/gh/moltin/shopkit) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![npm version](https://img.shields.io/npm/v/@moltin/react-shopkit.svg)](https://www.npmjs.com/package/@moltin/react-shopkit) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 🛠 Installation

Install the package from [npm](https://www.npmjs.com/package/@moltin/react-shopkit) inside your React project.

```bash
yarn add @moltin/react-shopkit
```

Next, inside your application, you need to wrap your root component with the `<ShopkitProvider />` and set your `clientId`. You can also set a custom `color`.

```js
import { Shopkit as ShopkitProvider } from '@moltin/react-shopkit'
​
ReactDOM.render(
  <ShopkitProvider clientId='INSERT_CLIENT_ID'>
    <App />
  </ShopkitProvider>,
  document.querySelector('#root')
)
```

## Usage

The components below can be imported and configured for use inside your application.

### Buy Button

The quickest way to add Moltin to your website is to use the `<BuyButton />` component. Simply specify a Product ID and instantly have it added to the cart functionality.

#### Props

| Prop       | Default     | Required | Description                                         |
| ---------- | ----------- | -------- | --------------------------------------------------- |
| `id`       | `undefined` | **Yes**  | Your Moltin product ID                              |
| `cartId`   | `undefined` | No       | A custom Cart ID (otherwise, created automatically) |
| `children` | `undefined` | **Yes**  | A custom render function for your button            |

#### Example

```js
import React from 'react'
import { BuyButton } from '@moltin/react-shopkit'

export default () => (
  <BuyButton id="61abf56a-194e-4e13-a717-92d2f0c9d4df">
    {({ addToCart }) => <button onClick={addToCart}>Add to Cart</button>}
  </BuyButton>
)
```

### Cart Button

Shopkit abstracts the cart functionality to the `<ShopkitProvider />` component that wraps your entire application. Using the React [Context API](https://reactjs.org/docs/context.html#reactcreatecontext) internally we are able to manage all cart state in one place and make it available to all other components.

#### Props

#### Example

```js
import React from 'react'
import { CartButton } from '@moltin/react-shopkit'
​
export default () => (
  <CartButton>
    {({
      total,
      count,
      shown,
      onClick,
      items,
      updateCartQuantity,
      removeFromCart
    }) => (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )}
  </CartButton>
)
```
