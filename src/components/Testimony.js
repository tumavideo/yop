import React from "react";

import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

export default function Testimony({
  modal,
  openModal,
  setModal,
  spinner,
  video,
  videoLoading,
}) {
  return (
    <div onClick={openModal}>
      <div className="col-md-4 mb-5">
        <img
          src={video.img_src}
          className="img-fluid cover-image"
          alt="image-1"
        />
        <h4 className="text-black">{video.title}</h4>
      </div>
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
                      fadeIn="none"
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
                  frameBorder="0"
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