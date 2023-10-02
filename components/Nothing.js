export default function Nothing({
  backgroundColor = "bg-indigo-100",
  color = "bg-indigo-600",
  firstLine = "Ready to explore community services?",
  second = "Start your free trial today.",
}) {
  return (
    <div className={`${backgroundColor} mt-6`}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {firstLine}
          <br />
          {second}
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a
            href="/register?type=seeker"
            className={`rounded-md ${color} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:${color} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}`}
          >
            Get started
          </a>
          <a
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export const ContentNA = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 200,
      border: "1px solid #ccc",
      backgroundColor: "#f5f5f5",
      color: "#777",
      fontSize: 18,
      textAlign: "center",
    }}
  >
    Content not available
  </div>
);
