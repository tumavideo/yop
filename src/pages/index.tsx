import Link from "next/link";

import Header from "../components/layout/Header";
import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import Subscribe from "../components/layout/Subscribe";
import Testimony from "../components/Testimony";
import { InfinitySpin } from "react-loader-spinner";
import { truncate } from "../utils/truncate";
import moment from "moment";
import { encodeQueryParameter } from "../utils/url";
import { client, urlFor } from "../lib/client";
import { BANNER_URL, POST_URL, TESTIMONY_URL } from "../api";
import axios from "axios";

export default function Home({ banner, jobs, post, testimony }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const openModal = () => {
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
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={item.img}
                      className="d-block w-100"
                      alt="zamrise banner"
                    />
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
          <div className="flag-badge d-flex mb-5">
            <img src="assets/images/__flag.svg" alt="zambia rise logo" />
            <h1 className="my-auto">Govt Programs</h1>
          </div>

          <div className="row">
            <div className="col-md-4">
              <a href="https://www.ceec.org.zm/" target="_blank">
                <img
                  className="img-fluid"
                  src="assets/images/pro-1.jpg"
                  alt="govt-1"
                />
              </a>
              <a href="https://www.napsa.co.zm/" target="_blank">
                <img
                  className="mt-3 img-fluid w-50"
                  src="assets/images/pro-logo-2.png"
                  alt="pro-1"
                />
              </a>
            </div>

            <div className="col-md-4">
              <a href="https://www.napsa.co.zm/" target="_blank">
                <img
                  className="img-fluid"
                  src="assets/images/pro-2.jpg"
                  alt="govt-1"
                />
              </a>
              <a href="https://www.ceec.org.zm/">
                <img
                  className="mt-3 img-fluid w-50"
                  src="assets/images/pro-logo-1.png"
                  alt="pro-1"
                />
              </a>
            </div>

            <div className="col-md-4">
              <a href="https://www.mlgrd.gov.zm/wp-content/uploads/2022/04/CDF-GUIDELINES-2.pdf">
                <img
                  className="img-fluid"
                  src="assets/images/pro-3.jpg"
                  alt="govt-1"
                />
              </a>
              <a href="https://www.mlgrd.gov.zm/wp-content/uploads/2022/04/CDF-GUIDELINES-2.pdf">
                <img
                  className="mt-3 img-fluid w-50"
                  src="assets/images/pro-logo-3.png"
                  alt="pro-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="opportunities">
        <div className="container">
          <div className="flag-badge d-flex mb-5">
            <img src="assets/images/__flag.svg" alt="zambia rise logo" />
            <h1 className="my-auto">Opportunities</h1>
          </div>

          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-2 col-6 text-center">
                {job.companyRef?.logo && (
                  <img
                    style={{ height: 60 }}
                    className="img-fluid"
                    src={urlFor(job.companyRef?.logo?.asset).url()}
                    alt="govt-1"
                  />
                )}
                <h2>Lusaka International Community</h2>
                <h3>Finance Manager</h3>
                <a href={`/application?jobId=${job._id}`} target="_blank">
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center">
            <Link
              href="/job"
              className="button btn-primary mt-5 align-items-center _button"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {post.length > 0 ? (
        <section id="stories">
          <div className="container">
            <div className="flag-badge d-flex mb-5">
              <img src="assets/images/__flag.svg" alt="zambia rise logo" />
              <h1 className="my-auto">Success Stories</h1>
            </div>
            <div className="row">
              {testimony.slice(0, 3).map((item) => {
                return (
                  <div className="col-md-4">
                    <Testimony
                      modal={modal}
                      openModal={openModal}
                      setModal={setModal}
                      spinner={spinner}
                      video={item}
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
            <div className="flag-badge d-flex mb-5">
              <img src="assets/images/__flag.svg" alt="zambia rise logo" />
              <h1 className="my-auto">News &amp; Updates</h1>
            </div>

            <div className="row">
              {post.slice(0, 3).map((item) => {
                return (
                  <div className="col-md-4">
                    <a href={`#/blog-detail/${encodeQueryParameter(item)}`}>
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
  const query = `*[_type == "job" && !(_id in path('drafts.**'))][0..5]{
    _id,
    _createdAt,
    position,
    role,
    slug,
    title,
    link,
    companyRef->{company,logo}
  }`;

  const jobs = await client.fetch(query);

  const post = (await axios.get(POST_URL(0))).data.payload;
  const testimony = (await axios.get(TESTIMONY_URL(0))).data.payload;
  const banner = (await axios.get(BANNER_URL)).data.payload;

  return {
    props: { banner, jobs, post, testimony },
  };
};
