import assets from "@/assets";

export default function Loading() {
  return (
    <div className="mx-auto bg-white">
      <div className="flex h-screen items-center justify-center">
        <div className="text-center animate-pulse">
          <img
            src={assets.officialLogo.src}
            alt="logo"
            className="h-auto w-96"
          />
          <br />
        </div>
      </div>
    </div>
  );
}
