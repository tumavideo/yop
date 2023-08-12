'use client';

import moment from "moment/moment";
import Image from "next/image";
import { useState } from "react";

import Title from "@/components/Title";

import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { truncate } from "../../utils/truncate";
import { POST_URL } from "../api";

export default async function Blog() {
    const posts = (await axios.get(POST_URL(0))).data.payload;
    const [loading, setLoading] = useState(false);

    return (
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
    );
}
