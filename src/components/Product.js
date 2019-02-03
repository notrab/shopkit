import { Component } from 'react'

export default class Product extends Component {
  state = {
    loading: true,
    error: null,
    data: {}
  }

  componentDidMount() {
    this.props.api
      .get(`products/${this.props.id}?include=main_image`)
      .then(({ data, included: { main_images } }) => {
        const imageId = data.relationships.main_image
          ? data.relationships.main_image.data.id
          : false

        this.setState({
          loading: false,
          data: {
            ...data,
            image: imageId
              ? main_images.find(img => img.id === imageId).link.href
              : ''
          }
        })
      })
      .catch(({ errors }) => console.log(errors))
  }

  render() {
    return this.props.children({
      ...this.state
    })
  }
}
