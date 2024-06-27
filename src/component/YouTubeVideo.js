import React from "react";
import YouTube from "react-youtube";

class YouTubeVideo extends React.Component {
  render() {
    const options = {
 
      playerVars: {
        autoplay: 1,
        controls: 1,
      },
    };

    return <YouTube  videoId="QvHzJOnS0sc" options={options} onReady={this._onReady} id="video"/>;
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

export default YouTubeVideo;
