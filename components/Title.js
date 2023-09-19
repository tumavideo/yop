export default function Title({ text }) {
  return (
    <div className="d-flex justify-content-between">
      <div className="flag-badge d-flex mb-5">
        <img src="../assets/images/__flag.svg" alt="zambia rise logo" />
        <h1 className="my-auto">{text}</h1>
      </div>
    </div>
  );
}
