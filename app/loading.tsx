import Logo from "@/assets/images/footer-logo.svg";

export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <img src={Logo.src} height="150" alt="logo" className="my-auto" />
          <br />
        </div>
      </div>
    </div>
  );
}
