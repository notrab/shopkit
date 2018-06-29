import React, { Component } from 'react'

import { Consumer } from '../context'

export default class CartConnector extends Component {
  state = {
    currentIndex: 0
  }

  goBack = () =>
    this.setState(state => ({
      currentIndex: state.currentIndex - 1
    }))

  goForward = () =>
    this.setState(state => ({
      currentIndex: state.currentIndex + 1
    }))

  render() {
    const { currentIndex } = this.state
    const isCart = currentIndex === 0

    return (
      <Consumer>
        {({
          cartTotal,
          cartCount,
          cartItems,
          cartShown,
          showCart,
          updateCartQuantity,
          removeFromCart,
          handleCheckout
        }) =>
          this.props.children({
            total: cartTotal,
            count: cartCount,
            items: cartItems,
            shown: cartShown,
            onClick: showCart,
            isCart: isCart,
            goForward: this.goForward,
            goBack: this.goBack,
            updateCartQuantity: updateCartQuantity,
            removeFromCart: removeFromCart,
            handleCheckout: handleCheckout,
            ...this.state,
            ...this.props
          })
        }
      </Consumer>
    )
  }
}
