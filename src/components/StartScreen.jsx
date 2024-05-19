export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-4xl px-6 py-3 bg-slate-800 rounded-lg">
        Welcome To The React Quiz
      </div>
      <div className="mt-5 text-3xl tracking-tight">
        <span className="border-b-2 border-orange-300">
          {numQuestions} questions
        </span>{" "}
        to test your <span className="border-b-2 border-orange-300">React</span>{" "}
        mastery
      </div>
      <div className="flex w-full items-center justify-center mt-14">
        <button
          onClick={() => dispatch({ type: "active" })}
          className="text-xl px-6 py-3 bg-slate-700 rounded-2xl border-2 border-transparent hover:border-slate-700 hover:bg-transparent transition"
        >
          Let's Start
        </button>
      </div>
    </div>
  );
}
