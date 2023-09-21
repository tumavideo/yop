export const LargeLeaderboard = ({
  height = "h-[90px] mx-auto",
  width = "w-[970px]",
}) => {
  return (
    <div className={`bg-blue-400 ${height} ${width} text-white`}>&nbsp;</div>
  );
};

export const WideSkyScraper = ({
  height = "h-[600px]",
  width = "w-[160px]",
}) => {
  return (
    <div
      className={`bg-blue-400 ${width} ${height} absolute left-20 text-white hidden 2xl:block`}
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
