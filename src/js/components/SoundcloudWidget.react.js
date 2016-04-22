import React, { PropTypes } from 'react'
import { SoundPlayerContainer } from 'react-soundplayer/addons'
import CustomPlayer from './CustomPlayer.react'

var SoundcloudWidget = React.createClass({

  getInitialState() {
    return {
      activePlayerId: 0
    }
  },

  propTypes: {
    release: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  },

  render() {
    const clientId = window.clientId
    const resolveUrl = this.props.release.soundcloudUrl
    return (
      <div>
        <SoundPlayerContainer
          clientId={clientId}
          resolveUrl={resolveUrl}
          onStartTrack={this.playCallbackAction.bind(this, this.props.index)}
        >
          <CustomPlayer
            playerId={this.props.index}
            activePlayerId={this.state.activePlayerId}
          />
        </SoundPlayerContainer>
      </div>
    )
  },

  playCallbackAction(i) {
    // console.log('playCallbackAction', i)
  }
})

// css: ./src/scss/_components.soundcloud-widget.scss

export default SoundcloudWidget
