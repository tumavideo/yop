import { useState } from "react";
import Image from "next/image";
import moment from "moment/moment";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Subscribe from "@/components/layout/Subscribe";
import Title from "@/components/Title";

import { getPost } from "../../api/web";
import { InfinitySpin } from "react-loader-spinner";
import { truncate } from "../../utils/truncate";
import { encodeQueryParameter } from "../../utils/url";
import axios from "axios";
import {POST_URL} from "../../api";

export default function Blog({ posts }) {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Header />
            <section id="news">
                <div className="container">
                    {!loading ? <Title text={"News & Updates"} /> : null}

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
                                        <a href={`/blog/${item._id}`}>
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
    const posts = (await axios.get(POST_URL(0))).data.payload;

    return {
        props: { posts },
    };
};
