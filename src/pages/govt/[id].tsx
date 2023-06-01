import { useState } from "react";
import axios from "axios";

import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Testimony from "../../components/Testimony";
import Title from "../../components/Title";

import { TESTIMONY_URL } from "../../api";

export default function Detail({ testimony }) {
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
    <>
      <Header />
      <section className="container mt-5 mb-5">
        <Title text={"Govt Program"} />
        <a className="mb-4" href="https://www.napsa.co.zm/" target="_blank">
          <img
            className="mb-3 mt-3 img-fluid"
            src="../assets/images/pro-logo-2.png"
            alt="pro-1"
            width={300}
          />
        </a>
        <div>
          The National Pension Scheme Act No. 40 of 1996 of the Laws of Zambia
          provides for investment of funds of the Scheme not immediately
          required to meet any charges or obligations in a range of assets. The
          primary aim of the investments is to provide for the benefits of the
          Sheme. The Authority had its investment guidelines revised in 2017 as
          per the Investment Guidelines Statutory Instrument (SI) number 19 of
          2017.
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h3>How To Access</h3>
          <Testimony
            image={testimony[4].img_src}
            modal={modal}
            openModal={() => openModal(testimony[4])}
            setModal={setModal}
            spinner={spinner}
            video={video}
            videoLoading={videoLoading}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const testimony = (await axios.get(TESTIMONY_URL(0))).data.payload;

  return {
    props: { testimony },
  };
};
