import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// import { markdown } from 'markdown'

import ConnectToStores from '../mixins/ConnectToStores'
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions'

// import ReactiveComponent from './ReactiveComponent.react'

function getState() {
  return {
    appState: AppStore.getState()
  }
}

var App = React.createClass({

  propTypes: {
    children: PropTypes.object,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  },

  childContextTypes: {
    location: PropTypes.object,
    params: PropTypes.object
  },

  getChildContext() {
    return {
      location: this.props.location,
      params: this.props.params
    }
  },

  mixins: [ConnectToStores([AppStore], getState)],

  renderPostList() {
    let { posts } = this.state.appState

    return posts.map((post, i) => {
      return (
        <div key={i}>
          <h2>Posts</h2>
          <h3>post.title</h3>
          <div dangerouslySetInnerHTML={{__html: post.content}}/>
        </div>
      )
    })
  },

  /**
   * Render the App component.
   * @return {object}
   */
  render() {
    return (
      <div>
        <h1>React / Flux Boilerplate</h1>
        <Link to='/'>Home</Link>
        {' '}
        <Link to='/about'>About</Link>
        {this.props.children ? React.cloneElement(this.props.children, {state: this.state}) : null}

        <div>
          <button onClick={this._onClickExample}>Action example</button>
        </div>

        <div>{this.renderPostList()}</div>

        {/* <ReactiveComponent /> */}
      </div>
    )
  },

  /**
   * Example click handler, calling an action.
   */
  _onClickExample() {
    AppActions.exampleAction()
  }

})

export default App
