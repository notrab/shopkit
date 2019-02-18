import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createClient, createCartIdentifier } from '@moltin/request'

import { Provider } from '../context'

export default class Shopkit extends Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    color: PropTypes.string,
    cartId: PropTypes.string,
    showCartOnSuccess: PropTypes.bool
  }

  static defaultProps = {
    color: '#FFE285',
    cartId: createCartIdentifier(),
    showCartOnSuccess: false
  }

  constructor(...args) {
    super(...args)

    if (!this.props.clientId) {
      throw new Error('Please provide a Moltin client ID')
    }

    this.state = {
      cartItems: [],
      cartShown: false,
      cartTotal: null
    }
  }

  api = new createClient({
    client_id: this.props.clientId,
    application: 'react-shopkit'
  })

  componentDidMount() {
    this.api
      .get(`carts/${this.props.cartId}/items`)
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

  _handleAddToCart = (id, quantity) =>
    this.api
      .post(`carts/${this.props.cartId}/items`, {
        type: 'cart_item',
        id,
        quantity
      })
      .then(this.updateCartState)
      .then(this.props.showCartOnSuccess && this._showCart)
      .catch(({ errors }) => console.log(errors))

  _handleQuantityChange = (id, quantity) =>
    this.api
      .put(`carts/${this.props.cartId}/items/${id}`, {
        type: 'cart_item',
        id,
        quantity
      })
      .UpdateItemQuantity(itemId, quantity)
      .then(this.updateCartState)
      .catch(({ errors }) => console.log(errors))

  _handleRemoveFromCart = id =>
    this.api
      .delete(`carts/${this.props.cartId}/items/${id}`)
      .then(this.updateCartState)
      .catch(({ errors }) => console.log(errors))

  _showCart = () => this.setState(state => ({ ...state, cartShown: true }))

  _handleShowCart = () =>
    this.setState(state => ({ cartShown: !state.cartShown }))

  _handleCheckout = (customer, billing, shipping) =>
    this.api.Cart().Checkout(customer, billing, shipping)

  render() {
    const { children, ...props } = this.props

    return (
      <Provider
        value={{
          ...this.state,
          ...props,
          api: this.api,
          showCart: this._handleShowCart,
          addToCart: this._handleAddToCart,
          updateCartQuantity: this._handleQuantityChange,
          removeFromCart: this._handleRemoveFromCart,
          handleCheckout: this._handleCheckout
        }}>
        {children}
      </Provider>
    )
  }
}
