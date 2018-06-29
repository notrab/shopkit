import React, { Component } from 'react'

import { Consumer } from '../context'

export default class ButtonConnector extends Component {
  state = {
    qty: 1
  }

  _handleUpdateQty = qty =>
    this.setState({
      qty
    })

  render() {
    const { qty } = this.state
    const { id, showQty, onClick, ...props } = this.props

    return (
      <Consumer>
        {({ addToCart, color }) => {
          return this.props.children({
            ...this.state,
            ...props,
            color: this.props.color || color,
            changeQty: this._handleUpdateQty,
            addToCart: addToCart.bind(this, id, qty)
          })
        }}
      </Consumer>
    )
  }
}
