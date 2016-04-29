import React, { PropTypes } from 'react'
import { PlayButton, Progress, Icons, PrevButton, NextButton, Timer } from 'react-soundplayer/components'
import classNames from 'classNames'

const { SoundCloudLogoSVG } = Icons

var CustomPlayer = React.createClass({
  getInitialState() {
    return {
      playlistIndex: null,
      loadingTimerCounter: 0
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

  toggleTrackAtIndex(playlistIndex) {
    let { soundCloudAudio } = this.props
    const { activeIndex } = this.state
    const { playing } = this.props

    if (playing && playlistIndex === activeIndex) {
      soundCloudAudio.pause()
    }
    else {
      this.playTrackAtIndex(playlistIndex)
    }
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
    let { playlist, currentTime } = this.props
    let { playlistIndex } = this.state

    // We're only interested in the first two tracks (A & AA).
    playlist.tracks = [
      playlist.tracks[0],
      playlist.tracks[1]
    ]

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

    let tracks = playlist.tracks.map((track, i) => {
      const isActive = this.state.activeIndex === i
      let classes = classNames(
        'sc__track',
        { 'sc__track--active': isActive }
      )

      let trackTime
      if (isActive) {
        trackTime = <span className="sc__track-length">{Timer.prettyTime(currentTime)} / {Timer.prettyTime(track.duration / 1000)}</span>
      }

      return (
        <li
          key={track.id}
          className={classes}
          onClick={this.toggleTrackAtIndex.bind(this, i)}
        ><span>{alphabet[i]}. {track.title}</span>{trackTime}</li>
      )
    })

    return (
      <ul className='sc__track-list'>{tracks}</ul>
    )

    return <div/>
  },

  timer: null,

  timerCallback() {
    this.timer = setTimeout(() => {
      const { loadingTimerCounter } = this.state
      this.setState({
        loadingTimerCounter: loadingTimerCounter + 1
      })
      this.timerCallback()
    }, 200)
  },

  componentWillMount() {
    this.timerCallback()
  },

  componentWillUnmount() {
    clearTimeout(this.timer)
  },

  startPlaylist() {
    let { soundCloudAudio } = this.props
    const { activeIndex } = this.state
    const { playing } = this.props

    if (!playing) {
      if (activeIndex) {
        this.playTrackAtIndex(activeIndex)
      }
      else {
        this.playTrackAtIndex(0)
      }
    }
  },

  pause() {
    let { soundCloudAudio } = this.props
    soundCloudAudio.pause()
  },

  render() {
    let { playlist, currentTime, duration } = this.props
    let { playlistIndex } = this.state
    let track

    if (typeof playlistIndex === 'number') {
      track = playlist.tracks[playlistIndex]
    }
    else if (playlist && playlist.tracks[0]) {
      track = playlist.tracks[0]
    }

    let imgUrl
    if (track) {
      imgUrl = track.artwork_url || playlist.artwork_url
      if (imgUrl) {
        imgUrl = imgUrl.replace('-large.', '-t500x500.')
      }
    }

    let loadingText = ' Loading media'
    const loadingTextChar = ' /'

    var i;
    for (i = 0; i < this.state.loadingTimerCounter; i++) {
      loadingText = loadingText + loadingTextChar
    }

    if (!playlist) {
      return (
        <div className='sc'>
          <div className='sc__loader'>{loadingText}</div>
        </div>
      )
    }

    const { playing, soundCloudAudio } = this.props
    let playPause
    if (!playing) {
      playPause = (
        <button
          className='sc__play-pause sc__play'
          onClick={this.startPlaylist}>Play</button>
      )
    }
    else {
      playPause = (
        <button
          className='sc__play-pause sc__pause'
          onClick={this.pause}>Stop</button>
      )
    }

    return (
      <div className='sc'>
        {this.renderTrackList()}
        <div className='sc__progress-wrapper'>
          {playPause}
          <Progress
            onSeekTrack={this.startPlaylist}
            className='sc__progress'
            innerClassName='sc__progress-inner'
            value={currentTime / duration * 100 || 0}
            style={{}}
            innerStyle={{}}
            {...this.props}
          />
        </div>
      </div>
    )
  }
})

// css: ./src/scss/_components.custom-player.scss

export default CustomPlayer