import React, { PropTypes } from 'react'
import { PlayButton, Progress, Icons, PrevButton, NextButton, Timer } from 'react-soundplayer/components'
import classNames from 'classNames'

const { SoundCloudLogoSVG } = Icons

var CustomPlayer = React.createClass({
  getInitialState() {
    return {
      playlistIndex: null
    }
  },

  componentDidMount() {
    // console.log(this.soundCloudAudio)
  },

  playTrackAtIndex(playlistIndex) {
    let { soundCloudAudio } = this.props
    this.setState({activeIndex: playlistIndex})
    soundCloudAudio.play({ playlistIndex })
  },

  componentWillReceiveProps(nextProps) {
    // Update playlist index.
    let playlistIndex = nextProps.soundCloudAudio._playlistIndex
    if (typeof playlistIndex !== 'number') {
      playlistIndex = null
    }
    this.setState({playlistIndex})

    // If another player is active then stop this one.
    const activePlayerChanged = this.props.activePlayerId !== nextProps.activePlayerId
    const { playerId, activePlayerId } = nextProps
    const activePlayer = playerId === activePlayerId
    let { soundCloudAudio } = nextProps

    if (activePlayerChanged && !activePlayer) {
      soundCloudAudio.pause()
    }
  },

  renderTrackList() {
    let { playlist } = this.props
    let { playlistIndex } = this.state

    if (!playlist) return <div>Loading...</div>

    let tracks = playlist.tracks.map((track, i) => {
      let classes = classNames('flex flex-center full-width left-align button button-transparent', {
        'is-active': this.state.activeIndex === i
      });

      let imgUrl = track.artwork_url || playlist.artwork_url
      if (imgUrl) {
        imgUrl = imgUrl.replace('-large.', '-t500x500.')
      }

      return (
        <div
          key={track.id}
          className='sc__playlist-row grid'
          onClick={this.playTrackAtIndex.bind(this, i)}
        >
          <div className='grid__item one-third'>
            <img src={imgUrl} className='sc__playlist-row-img'/>
          </div>

          <div className='grid__item two-thirds'>
            <button
              className={classes}
            >
              <span>{track.user.username} - {track.title}</span>
              <span>{Timer.prettyTime(track.duration / 1000)}</span>
            </button>
          </div>
        </div>
      )
    })

    return (
      <div>{tracks}</div>
    )

    return <div/>
  },

  render() {
    let { playlist, currentTime, duration } = this.props
    let { playlistIndex } = this.state
    let track = typeof playlistIndex === 'number' ? playlist.tracks[playlistIndex] : null

    return (
      <div>

        <h3>{track ? track.title : ''}</h3>

        <PlayButton
          className='sc__play'
          {...this.props}
        />

        <PrevButton
          className='sc__prev'
          {...this.props}
        />

        <NextButton
          className='sc__next'
          {...this.props}
        />

        <Progress
          className='sc__progress'
          innerClassName='sc__progress-inner'
          value={currentTime / duration * 100 || 0}
          style={{}}
          innerStyle={{}}
          {...this.props}
        />

        {this.renderTrackList()}
      </div>
    )
  }
})

// css: ./src/scss/_components.custom-player.scss

export default CustomPlayer