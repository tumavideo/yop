import assets from "@/assets";

export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <img src={assets.logo.src} alt="logo" className="h-auto w-96" />
          <br />
        </div>
      </div>
    </div>
  );
}
