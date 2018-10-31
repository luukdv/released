import React from 'react'

export default class Search extends React.PureComponent {
  state = { value: '' }

  handler(e) {
    this.setState({value: e.target.value})
  }

  render() {
    return <input type="text" value={this.state.value} onChange={e => this.handler(e)} />
  }
}
