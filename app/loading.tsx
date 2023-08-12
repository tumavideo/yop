import Logo from "@/assets/images/footer-logo.svg";

export default function Loading() {
  return (
    <div className="container">
      <div className="row vh-100">
        <div className="my-auto mx-auto text-center">
          <img
            src={Logo.src}
            height="150"
            alt="logo"
            className="my-auto"
          />
          <br />
        </div>
      </div>
    </div>
  )
}
