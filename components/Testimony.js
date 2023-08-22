"use client"

import { useState } from 'react';

import { BiLoaderAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

export default function Testimony({
  image,
  title,
}) {
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [video, setVideo] = useState({});

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };
 
  const openModal = (video) => {
    setVideo(video);
    setModal(!modal);
  };

  return (
    <div onClick={openModal}>
      <>
        <img src={image} className="img-fluid cover-image" alt="image-1" />
        <h4 className="text-black">{title}</h4>
      </>
      {modal ? (
        <section className="modal__bg">
          <div className="modal__align">
            <div className="modal__content" modal={modal}>
              <IoCloseOutline
                className="modal__close"
                arial-label="Close modal"
                onClick={setModal}
              />
              <div className="modal__video-align">
                {videoLoading ? (
                  <div className="modal__spinner">
                    <BiLoaderAlt
                      className="modal__spinner-style"
                      fadein="none"
                    />
                  </div>
                ) : null}
                <iframe
                  className="modal__video-style"
                  onLoad={spinner}
                  loading="lazy"
                  width="800"
                  height="500"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
