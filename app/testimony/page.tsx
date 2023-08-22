'use client';

import axios from "axios";

import Testimony from "@/components/Testimony";
import Title from "@/components/Title";

import { TESTIMONY_URL } from "../api";

export default async function Home() {
  const testimony = (await axios.get(TESTIMONY_URL(0))).data.payload;

  return (
    <>
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
                      title={item.title}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
