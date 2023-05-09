const videos = [
  {
    text: "",
    title: "Delivering on Commitments #ZangenaSeason",
    video: "KA8p760H89U",
  },
  {
    text: "CEEC gives out interest free loans to marketeers #ZangenaSeason",
    title: "Marketeer Booster Loan",
    video: "8Hc9dpdelZg",
  },
  {
    text: "UNZA Students celebrate reintroduction of meal allowances",
    title: "Unza Meal Allowance",
    video: "HivnhNb50aw",
  },
];

export default function Successes() {
  return (
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {videos.map((v) => (
          <div class="col">
            <div class="card h-100">
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${v.video}`}
                  allowfullscreen
                ></iframe>
              </div>
              <div class="card-body">
                <h5 class="card-title">{v.title}</h5>
                <p class="card-text">{v.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
