import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { InfinitySpin } from "react-loader-spinner";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Subscribe from "@/components/layout/Subscribe";
import Testimony from "@/components/Testimony";
import Title from "@/components/Title";

import { TESTIMONY_URL } from "../api";
import { client } from "../lib/client";
import { findOpportunities } from "../lib/queries";
import { truncate } from "../utils/truncate";

export default function Home({ testimony }) {
  const [loading, setLoading] = useState(false);
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

  return loading ? (
    <div className="container">
      <div className="row vh-100">
        <div className="my-auto mx-auto text-center">
          <img
            src="assets/images/footer-logo.svg"
            height="150"
            alt="logo"
            className="my-auto"
          />
          <br />
          <InfinitySpin width="200" color="#319c53" />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Header />

      {testimony.length > 0 ? (
        <section id="stories">
          <div className="container">
            <Title text={"Success Stories"} />
            <div className="row">
              {testimony.slice(0, 3).map((item) => {
                return (
                  <div key={item._id} className="col-md-4">
                    <Testimony
                      image={item.img_src}
                      modal={modal}
                      openModal={() => openModal(item)}
                      setModal={setModal}
                      spinner={spinner}
                      title={item.title}
                      video={video}
                      videoLoading={videoLoading}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = findOpportunities("5");
  const data = await client.fetch(query);
  const jobs = data.job;

  const testimony = (await axios.get(TESTIMONY_URL(0))).data.payload;

  return {
    props: { testimony },
  };
};
