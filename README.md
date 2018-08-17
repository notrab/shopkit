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

ReactDOM.render(
  <ShopkitProvider clientId='INSERT_CLIENT_ID'>
    <App />
  </ShopkitProvider>,
  document.querySelector('#root')
)
```

## 🏗 Components

### Button

#### Props

Prop | Default | Required | Description
--- | --- | --- | ---
`id` | `undefined` | **Yes** | Your Moltin product ID
`cartId` | `undefined` | No | A custom cart ID (otherwise created automatically)
`children` | `undefined` | **Yes** | A custom render function for your product

#### Example

```js
import React from 'react'
import { Button } from '@moltin/react-shopkit'

export default () => (
  <Button productId="61abf56a-194e-4e13-a717-92d2f0c9d4df">
    {({addToCart}) => (
      <button onClick={addToCart}>Add to Cart</button>
    )}
  </Button>
)
```

### Product

#### Props

Prop | Default | Required | Description
--- | --- | --- | ---
`id` | `undefined` | **Yes** | Your Moltin product ID
`children` | `undefined` | **Yes** | A custom render function for your product

#### Example

```js
import React from 'react'
import { Product, Button } from '@moltin/react-shopkit'

export default () => (
  <Product id="1f6eaa8a-80dc-4b1d-a66d-4cc3a1f7f3bb">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading!</p>
      if (error) return <p>Error occured!</p>

      return (
        <div>
          <h2>{data.name}</h2>
          <Button id={data.id} />
        </div>
      )
    }}
  </Product>
)
```

### Product Grid

> You will need to import `Button` if you wish add items to the cart

#### Props

Prop | Default | Required | Description
--- | --- | --- | ---
`maxProducts` | `12` | No | Set the max products per page
`children` | `undefined` | **Yes** | A custom render function for your product list/grid

#### Example

```js
import React from 'react'
import { Product, Button } from '@moltin/react-shopkit'

export default () => (
  <Product id="1f6eaa8a-80dc-4b1d-a66d-4cc3a1f7f3bb">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading!</p>
      if (error) return <p>Error occured!</p>

      return (
        <div>
          <h2>{data.name}</h2>
          <Button id={data.id} />
        </div>
      )
    }}
  </Product>
)
```

### Cart

#### Props

Prop | Default | Required | Description
--- | --- | --- | ---
`total`
`count`
`items`
`shown`
`goForward`
`goBack`
`updateCartQuantity`
`removeFromCart`
`handleCheckout`

#### Example

```js
import React from 'react'
import { Cart } from '@moltin/react-shopkit'

export default () => (
  <Cart>
    {({ total, count, shown, onClick, items, updateCartQuantity, removeFromCart }) => {
      if (loading) return <p>Loading!</p>
      if (error) return <p>Error occured!</p>

      return (
        <div>
          <h2>{data.name}</h2>
          <Button id={data.id} />
        </div>
      )
    }}
  </Cart>
)
```
