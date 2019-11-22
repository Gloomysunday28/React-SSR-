import React, { PureComponent } from 'react'

class AsyncComponent extends PureComponent {
  constructor(props) {
    super(props)

    this.load = this.load.bind(this)
  }
  
  state = {
    component: null
  }

  UNSAFE_componentWillMount() {
    if (!this.state.component) {
      this.load()
    }
  }

  load() {
    const {
      load
    } = this.props

    load().then(component => {
      this.setState(() => ({
        component: component.default ? component.default : component
      }))
    })
  }
  
  render() {
    return (
      this.state.component ? this.props.children(this.state.component) : <span>加载中....</span>
    )
  }
}

export default AsyncComponent
