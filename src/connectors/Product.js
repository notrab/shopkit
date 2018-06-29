import React, { Component } from 'react'

import { Consumer } from '../context'
import Product from '../components/Product'

export default class ProductConnector extends Component {
  render() {
    return <Consumer>{ctx => <Product {...ctx} {...this.props} />}</Consumer>
  }
}
