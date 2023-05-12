import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Subscribe from "../components/layout/Subscribe";
import { InfinitySpin } from "react-loader-spinner";
import { getTestimony } from "../api/web";
import { truncate } from "../utils/truncate";
import Link from "next/link";
import Testimony from "../components/Testimony";

export default function Blog({ testimonies }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const openModal = () => {
    setModal(!modal);
  };

  return (
    <div id="blog">
      <Header />
      <section id="stories">
        <div className="container">
          {!loading ? (
            <div className="flag-badge d-flex mb-5">
              <img src="assets/images/__flag.svg" alt="zambia rise logo" />
              <h1 className="my-auto">Success Stories</h1>
            </div>
          ) : null}

          <div className="row">
            {loading ? (
              <div className="text-center">
                <InfinitySpin width="200" color="#319c53" />
                <p>Please Wait</p>
              </div>
            ) : (
              testimonies.map((item) => {
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
              })
            )}
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="successModal"
        tabIndex="-1"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div id="success" className="text-center">
                <div className="circle mx-auto text-center">
                  <img
                    src="assets/images/ss.jpg"
                    alt="client"
                    className="mt-3"
                  />
                </div>

                <h3>Muzeka Ntoka</h3>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="align-self-center w-100">
                    Zambia Rise is essential for fostering economic growth,
                    social progress, and sustainable development in our country.
                    By raising awareness of the opportunities and initiatives
                    created by the New Dawn government.
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <button
                  className="button btn-primary mt-3 align-items-center"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const testimonies = await getTestimony(0).then((response) => {
    if (!response.error) {
      return response.payload;
    }
  });

  return {
    props: { testimonies },
  };
};
