import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

import Opportunity from "@/components/Opportunity";
import Testimony from "@/components/Testimony";
import Title from "@/components/Title";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Subscribe from "@/components/layout/Subscribe";

import { BANNER_URL, POST_URL, PROGRAM_URL, TESTIMONY_URL } from "../api";
import { client } from "../lib/client";
import { findOpportunities } from "../lib/queries";
import { truncate } from "../utils/truncate";
import ReactGA from "react-ga";

const TRACKING_ID = process.env.GA; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export default function Home({ banner, jobs, post, testimony, program }) {
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
      {banner.length > 0 ? (
        <section className="container mt-5">
          <div
            id="carouselIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {banner.map((item, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide-to={index}
                    className={`${index === 0 ? "active" : ""}`}
                    aria-current="true"
                    aria-label={`Slide ${index}`}
                  ></button>
                );
              })}
            </div>
            <div className="carousel-inner">
              {banner.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <a href={item.uri} target="_blank">
                      <img
                        src={item.img}
                        className="d-block w-100"
                        alt="zamrise banner"
                      />
                    </a>
                  </div>
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
      ) : null}

      <section id="programs">
        <div className="container">
          <Title text={"Govt Programs"} />
          <div className="row">
            {program.map((program) => (
              <div className="col-md-4" key={program._id}>
                <a
                  href={`/govt/${program._id}`}
                  onClick={() =>
                    ReactGA.event({
                      category: "government",
                      action: program._id,
                      label: program.name,
                    })
                  }
                >
                  <img
                    className="img-fluid"
                    src={program.cover_uri}
                    alt="govt-1"
                  />
                </a>
                <a
                  href={`${program.link_uri}`}
                  target="_blank"
                  onClick={() =>
                    ReactGA.event({
                      category: "government",
                      action: program._id,
                      label: program.name,
                    })
                  }
                >
                  <img
                    className="mt-3 img-fluid w-50"
                    src={program.logo_uri}
                    alt={`pro-${program._id}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities">
        <div className="container">
          {jobs.length > 0 && <Opportunity title="Opportunities" opps={jobs} />}
          <div className="d-flex justify-content-center">
            <Link
              href="/opportunities"
              className="button btn-primary mt-5 align-items-center _button mb-5"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {post.length > 0 ? (
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

      {post.length > 0 ? (
        <section id="news">
          <div className="container">
            <Title text={"News & Updates"} />
            <div className="row">
              {post.slice(0, 3).map((item) => {
                return (
                  <div key={item._id} className="col-md-4">
                    <a href={`/blog/${item._id}`}>
                      <img className="img-fluid" src={item.img} alt="govt-1" />
                    </a>
                    <h1>{item.title}</h1>
                    <p>{truncate(item.description, 120)}</p>
                    <div className="d-flex">
                      <hr />
                      <h6 className="my-auto">
                        {moment(item.dateCreated).format("DD MMM, YYYY")}
                      </h6>
                    </div>
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
  
  const [bannerData, postData, programData, testimonyData] = await Promise.all([
    axios.get(BANNER_URL),
    axios.get(POST_URL(0)),
    axios.get(PROGRAM_URL(0)),
    axios.get(TESTIMONY_URL(0)),
  ]);

  const post = postData.data.payload;
  const testimony = testimonyData.data.payload;
  const banner = bannerData.data.payload;
  const program = programData.data.payload;

  return {
    props: { banner, jobs, post, program, testimony },
  };
};
