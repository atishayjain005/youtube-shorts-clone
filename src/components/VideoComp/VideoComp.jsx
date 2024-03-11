/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./videoComp.css";

import Marquee from "react-fast-marquee";

import {
  BiArrowBack,
  BiDislike,
  BiDotsVerticalRounded,
  BiLike,
  BiPlay,
  BiSolidCommentDetail,
  BiSolidFace,
  BiSolidShare,
} from "react-icons/bi";

export default function VideoComp({
  id,
  url,
  channel,
  description,
  likes,
  dislike,
  shares,
  comment,
  isPlaying,
  setIsPlaying,
  isMobile,
}) {
  const [subs, setSubs] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the video
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current.currentTime === videoRef.current.duration) {
      setCurrentTime(0);
    } else {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSubscribe = () => {
    setSubs((sub) => !sub);
  };

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
              setIsPlaying(true);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(videoRef.current);
    }
  }, [isMobile]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLikeClick = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className="video">
      {!isPlaying && (
        <div className="video_cover">
          <span>
            <BiPlay size={80} />
          </span>
        </div>
      )}
      <video
        id={id}
        className="video__player"
        onTimeUpdate={handleTimeUpdate}
        loop
        ref={videoRef}
        src={url}
        controls={false}
        autoPlay
        muted
        onClick={togglePlay}
      />

      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon">
            <BiArrowBack />
          </div>
          <div className="shortsVideoTopIcon">
            <BiDotsVerticalRounded />
          </div>
        </div>
        <div className="shortsVideoSideIcons">
          <div
            className="shortsVideoSideIcon"
            onClick={handleLikeClick}
            style={{ color: isLiked ? "red" : "white" }}
          >
            <BiLike />
            <p>{likeCount}</p>
          </div>
          <div className="shortsVideoSideIcon">
            <BiDislike />
            <p>{dislike}</p>
          </div>
          <div className="shortsVideoSideIcon">
            <BiSolidCommentDetail />
            <p>{comment}</p>
          </div>
          <div className="shortsVideoSideIcon">
            <BiSolidShare />
            <p>{shares}</p>
          </div>
        </div>
        <div className="shortsBottom">
          <Marquee className="shortsDesc">{description}</Marquee>
          <div className="shortDetails">
            <BiSolidFace size={40} />
            {/*I've used an icon instead of a channel dp for now */}
            <p>{channel}</p>
            <button
              style={{
                background: subs ? "red" : "white",
                color: subs ? "white" : "black",
              }}
              onClick={handleSubscribe}
            >
              {subs ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
        <div className="progress-bar">
          {videoRef.current && (
            <div
              className="progress-bar__fill"
              style={{
                width: `${(currentTime / videoRef.current.duration) * 100}%`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
