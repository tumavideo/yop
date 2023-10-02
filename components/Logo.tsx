import assets from "@/assets";

export default function Logo() {
  return (
    <div className="mx-auto max-w-4xl pb-40 font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
      <img
        src={assets.officialLogo.src}
        className="h-auto w-96 absolute mx-auto"
        alt="logo"
      />
    </div>
  );
}
