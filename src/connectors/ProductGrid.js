import React, { Component } from 'react'

import { Consumer } from '../context'
import ProductGrid from '../components/ProductGrid'

export default class ProductGridConnector extends Component {
  static defaultProps = {
    offset: 12,
    maxProducts: 12
  }

  render() {
    return (
      <Consumer>{ctx => <ProductGrid {...ctx} {...this.props} />}</Consumer>
    )
  }
}
