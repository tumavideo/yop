import React, { useState } from "react";
import Header from "../components/layout/Header";
import Subscribe from "../components/layout/Subscribe";
import Footer from "../components/layout/Footer";
import { getPost } from "../api/web";
import { InfinitySpin } from "react-loader-spinner";
import { truncate } from "../utils/truncate";
import moment from "moment/moment";
import { encodeQueryParameter } from "../utils/url";
import Image from "next/image";

export default function Blog({ posts }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header />
      <section id="news">
        <div className="container">
          {!loading ? (
            <div className="flag-badge d-flex mb-5">
              <img src="assets/images/__flag.svg" alt="zambia rise logo" />
              <h1 className="my-auto">News &amp; Updates</h1>
            </div>
          ) : null}

          <div className="row">
            {loading ? (
              <div className="text-center">
                <InfinitySpin width="200" color="#319c53" />
                <p>Please Wait</p>
              </div>
            ) : (
              posts.map((item) => {
                return (
                  <div key={item.id} className="col-md-4 mb-5">
                    <a href={`#/blog-detail/${encodeQueryParameter(item)}`}>
                      <Image
                        width={600}
                        height={200}
                        className="img-fluid"
                        src={item.img}
                        alt="govt-1"
                      />
                    </a>
                    <h1>{item.title}</h1>
                    <p>{truncate(item.description, 120)}</p>
                    <div className="d-flex">
                      <hr className="my-auto" />
                      <h6 className="my-auto">
                        {moment(item.dateCreated).format("DD MMM, YYYY")}
                      </h6>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <Subscribe />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const posts = await getPost(0).then((response) => {
    if (!response.error) {
      return response.payload;
    }
  });

  return {
    props: { posts },
  };
};
