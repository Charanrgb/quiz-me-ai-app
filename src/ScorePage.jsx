import React from 'react';

// Component for the Score Page
const ScorePage = ({ score, totalQuestions, wrongQuestions, onRestartQuiz, onReturnHome }) => (
  <div className="text-center">
    <h2 className="text-4xl font-bold text-white mb-6">Quiz Completed!</h2>
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
      <p className="text-3xl font-semibold text-gray-800 mb-4">
        You scored {score} out of {totalQuestions}
      </p>
      {wrongQuestions.length > 0 ? (
        <div className="text-left mt-6">
          <h3 className="text-xl font-semibold text-red-600 mb-3">Questions you got wrong:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {wrongQuestions.map((item, index) => (
              <li key={index} className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="font-medium">Q{item.questionNumber}: {item.questionText}</p>
                <p className="text-sm text-red-500">Your Answer: {item.yourAnswer}</p>
                <p className="text-sm text-green-600">Correct Answer: {item.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-xl text-green-600 font-semibold mt-6">Congratulations! You got all the questions right!</p>
      )}
      <div className="mt-8 space-y-4">
        <button
          onClick={onReturnHome}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Create New Quiz
        </button>
      </div>
    </div>
  </div>
);

export default ScorePage;
