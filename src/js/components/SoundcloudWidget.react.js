import React, { PropTypes } from 'react'

var SoundcloudWidget = React.createClass({

  propTypes: {
    release: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  },

  render() {
    return (
      <div>
        <h3>SoundcloudWidget</h3>
      </div>
    )
  }
})

// css: ./src/scss/_components.soundcloud-widget.scss

export default SoundcloudWidget