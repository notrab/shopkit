import React, { Component } from 'react'
import { gateway as MoltinGateway } from '@moltin/sdk'

import { Provider } from '../context'

export default class Shopkit extends Component {
  constructor(props) {
    super(props)

    if (!props.clientId) {
      throw new Error('Please provide a Moltin client ID')
    }
  }

  static defaultProps = {
    clientId: undefined,
    color: '#FFE285',
    showCartOnSuccess: false
  }

  state = {
    cartItems: [],
    cartShown: false,
    cartTotal: null
  }

  api = MoltinGateway({
    client_id: this.props.clientId
  })

  componentDidMount() {
    this.api
      .Cart()
      .Items()
      .then(this.updateCartState)
      .catch(({ errors }) => console.log(errors))
  }

  updateCartState = ({ data, meta }) =>
    this.setState({
      cartItems: data,
      cartTotal: meta.display_price.with_tax.formatted,
      cartCount: data.length,
      meta
    })

  _handleAddToCart = (id, qty) =>
    this.api
      .Cart()
      .AddProduct(id, qty)
      .then(this.updateCartState)
      .then(this.props.showCartOnSuccess && this._showCart)
      .catch(({ errors }) => console.log(errors))

  _handleQuantityChange = (itemId, quantity) =>
    this.api
      .Cart()
      .UpdateItemQuantity(itemId, quantity)
      .then(this.updateCartState)
      .catch(({ errors }) => console.log(errors))

  _handleRemoveFromCart = itemId =>
    this.api
      .Cart()
      .RemoveItem(itemId)
      .then(this.updateCartState)
      .catch(({ errors }) => console.log(errors))

  _showCart = () => this.setState(state => ({ ...state, cartShown: true }))

  _handleShowCart = () =>
    this.setState(state => ({ cartShown: !state.cartShown }))

  _handleCheckout = (customer, billing, shipping) =>
    this.api.Cart().Checkout(customer, billing, shipping)

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          ...this.props,
          api: this.api,
          showCart: this._handleShowCart,
          addToCart: this._handleAddToCart,
          updateCartQuantity: this._handleQuantityChange,
          removeFromCart: this._handleRemoveFromCart,
          handleCheckout: this._handleCheckout
        }}>
        {this.props.children}
      </Provider>
    )
  }
}
