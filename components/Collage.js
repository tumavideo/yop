const images = [
  "https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1642257859842-c95f9fa8121d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3336&q=80",
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

export default function Collage() {
  return (
    <>
      <div className="hidden mt-14 lg:flex justify-end gap-8 lg:mt-0 lg:pl-0">
        <div className="ml-auto w-60 flex-none space-y-8 order-none pt-80">
          <div className="relative">
            <img
              src={images[0]}
              alt=""
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="mr-auto w-60 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
          <div className="relative">
            <img
              src={images[1]}
              alt=""
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
