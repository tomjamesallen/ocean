import React from 'react'
import ReactDOM from 'react-dom'
import SoundcloudWidget from './components/SoundcloudWidget.react'

const releases = window.releases

releases.forEach((release, i) => {
  const elId = `react-soundcloud-container-${i}`
  let el = document.getElementById(elId)
  if (el) {
    ReactDOM.render(<SoundcloudWidget release={release} key={i} index={i} />, el)
  }
})
