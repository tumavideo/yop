import ReferralModalTrigger from "@/components/ReferralModalTrigger";

function Xmas(props) {
  const { session, data, user } = props;

  return (
    <div className="background-animate w-full  font-sans py-5 flex justify-center items-center space-x-2 bg-gradient-to-r from-orange-600 via-red-500 to-red-600">
      <h3 className="text-white font-semibold text-lg">
        🎄 12 days of Christmas Giveaway! 👉
      </h3>
      <ReferralModalTrigger session={session} data={data} user={user}>
        <button className="text-amber-900 px-3 py-2 font-bold font-mono rounded-full bg-amber-300 hover:bg-amber-400">
          Unlock!
        </button>
      </ReferralModalTrigger>
    </div>
  );
}

export default Xmas;
