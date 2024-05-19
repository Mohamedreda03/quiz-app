export default function Progress({
  numQuestions,
  index,
  currentPoints,
  totalPointes,
  answer,
}) {
  const hasAnswered = answer !== null;

  return (
    <div className="md:max-w-xl mx-auto flex flex-col w-full items-center justify-center mt-14">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${((index + 1) / numQuestions) * 100}%` }}
        />
      </div>
      <div className="flex w-full mt-3 items-center justify-between">
        <div className="">
          {index + 1} / {numQuestions}
        </div>
        <div className="">
          {currentPoints} / {totalPointes} points
        </div>
      </div>
    </div>
  );
}
