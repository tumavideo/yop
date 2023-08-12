import axios from "axios";
import moment from "moment/moment";
import { POST_DATA_URL } from "../../api";

export default async function Detail({params: { id }}) {
  const post = (await axios.get(POST_DATA_URL(id))).data.payload;

  return (
    <section id="blog-detail">
      <div id="news">
        <div className="container">
          <div className="flag-badge d-flex w-100">
            <img src="../../assets/images/__flag.svg" alt="zambia rise logo" />
            <h1 className="my-auto">News</h1>
          </div>

          <img className="img-fluid" src={post.img} alt="govt-1" />
          <h2>{post.title}</h2>
          <div className="d-flex">
            <hr/>
            <h6 className="my-auto">{moment(post.dateCreated).format("DD MMM, YYYY")}</h6>
          </div>
          <p>{post.description}</p>

          <h5>SHARE NEWS ON SOCIAL MEDIA</h5>
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item"><a href="#"><img src="../../assets/images/facebook.svg"/></a></li>
            <li className="list-inline-item"><a href="#"><img src="../../assets/images/whatsapp.svg"/></a></li>
            <li className="list-inline-item"><a href="#"><img src="../../assets/images/twitter.svg"/></a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
