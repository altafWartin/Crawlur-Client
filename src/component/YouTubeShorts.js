import React from 'react';
import YouTube from 'react-youtube';

class YouTubeShorts extends React.Component {
  render() {
    const opts = {
      height: '440',
      width: '260',
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId={this.props.videoId} opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    // Autoplay is off by default, so no need to call playVideo() here
    // If you need to do other setup on ready, you can add it here
  }
}

export default YouTubeShorts;
