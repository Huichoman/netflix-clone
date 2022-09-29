import React from "react";
import YouTube from "react-youtube";
import styles from "./MovieTrailer.module.css";
export const MovieTrailer = ({ trailerId }) => {
  const opts = {
    position: "absolute",
    height: "200%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  return (
    <div className={styles.embedContainer}>
      <YouTube videoId={trailerId} opts={opts} onReady={onPlayerReady} />
    </div>
  );
};
