import { Component } from 'react'

export default class Grid extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    links: null,
    offset: this.props.offset,
    included: {}
  }

  handleError = error => this.setState({ loading: false, error })

  componentDidMount() {
    this.props.api.Products.With(['main_image'])
      .Limit(this.props.maxProducts)
      .All()
      .then(({ data, links, meta, included }) => {
        this.setState({
          loading: false,
          links,
          meta,
          data,
          included
        })
      })
      .catch(this.handleError)
  }

  loadMore = () => {
    this.setState({ loading: true })

    this.props.api.Products.Offset(this.state.offset)
      .Limit(this.props.maxProducts)
      .All()
      .then(({ data, links, meta, included }) => {
        this.setState(state => ({
          loading: false,
          links,
          meta,
          data: [...state.data, ...data],
          included: {
            ...state.included,
            ...included
          },
          offset: state.offset + this.props.maxProducts
        }))
      })
      .catch(this.handleError)
  }

  render() {
    const { links, ...state } = this.state
    const hasMoreProducts = links && links.next

    return this.props.children({
      ...state,
      hasMoreProducts,
      loadMore: this.loadMore
    })
  }
}
