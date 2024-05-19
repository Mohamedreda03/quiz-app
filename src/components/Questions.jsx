import Timer from "./Timer";

export default function Questions({
  question,
  dispatch,
  answer,
  numQuestions,
  index,
  secondsRemaining,
}) {
  const hasAnswered = answer !== null;

  return (
    <div className="md:max-w-xl mx-auto mt-12">
      <h4 className="text-2xl">{question.question}</h4>
      <div className="flex flex-col gap-3 mt-11">
        {question.options.map((option, i) => (
          <button
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            className={`px-11 py-4 rounded-2xl text-start ${
              !hasAnswered && "hover:bg-slate-700"
            } transition ${
              hasAnswered && i === answer && "border-2 border-purple-600"
            } ${
              hasAnswered
                ? question.correctOption === i
                  ? "bg-green-600"
                  : "bg-red-600"
                : "bg-slate-800"
            }`}
          >
            {option}
          </button>
        ))}
        <div className="flex justify-between items-center mt-6">
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          <div className="flex">
            {answer !== null && (
              <div>
                {numQuestions - 1 !== index ? (
                  <button
                    onClick={() => dispatch({ type: "next" })}
                    className="bg-slate-700 px-9 py-3 rounded-2xl text-lg"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch({ type: "finished" })}
                    className="bg-orange-600 px-9 py-3 rounded-2xl text-lg"
                  >
                    Finch
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
