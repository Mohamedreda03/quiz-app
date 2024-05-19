export default function FinishScreen({ points, totalPointes, dispatch }) {
  const percentage = (points / totalPointes) * 100;
  return (
    <div className="md:max-w-2xl mx-auto mt-32 h-32 flex flex-col items-center justify-center">
      <div
        key={points}
        className="text-sm md:text-4xl px-9 py-5 bg-slate-800 rounded-2xl"
      >
        You scored{" "}
        <span className="border-b-2 border-orange-600">{points}</span> out of{" "}
        <span className="border-b-2 border-orange-600">{totalPointes}</span>{" "}
        <span className="border-b-2 border-green-700">
          ( {Math.ceil(percentage)}% )
        </span>
      </div>
      <div className="mt-12">
        <button
          onClick={() => dispatch({ type: "resit" })}
          className="bg-slate-700 px-9 py-3 rounded-2xl text-lg"
        >
          Resit
        </button>
      </div>
    </div>
  );
}
