export const LargeLeaderboard = () => {
  return <div className="bg-blue-400 h-24 min-w-full text-white">&nbsp;</div>;
};

export const WideSkyScraper = () => {
  return (
    <div
      className="bg-blue-400 w-[150px] h-[800px] absolute left-20 text-white hidden 2xl:block"
      style={{
        writingMode: "vertical-lr",
        textAlign: "center",
        fontSize: "2rem",
      }}
    >
      Your Ad Here
    </div>
  );
};
