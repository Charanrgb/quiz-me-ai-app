import React from 'react';

// Component for the Quiz Questions Page
const QuestionsPage = ({ question, questionNumber, totalQuestions, answerOptions, handleAnswerOptionClick, handleNextQuestion, feedbackMessage, selectedOptionIndex, userSelectedAnswer }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-white mb-6">Quiz Questions</h2>
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-105">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          Question {questionNumber}/{totalQuestions}
        </div>
        <div className="text-2xl font-semibold text-gray-800">
          {question.questionText}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerOptionClick(option.isCorrect, option.answerText, index)}
            className={`
              w-full text-left py-3 px-4 rounded-lg border-2
              ${userSelectedAnswer === null
                ? 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                : option.isCorrect
                  ? 'bg-green-100 border-green-500' // Correct answer highlight
                  : selectedOptionIndex === index && !option.isCorrect
                    ? 'bg-red-100 border-red-500' // Incorrect selected answer highlight
                    : 'bg-gray-100 border-gray-300' // Default for unselected answers after selection
              }
              text-gray-800 font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            `}
            disabled={userSelectedAnswer !== null} // Disable buttons after an answer is selected
          >
            {option.answerText}
          </button>
        ))}
      </div>
      {feedbackMessage && (
        <p className={`text-center text-lg font-semibold mb-4 ${feedbackMessage.includes('Correct') ? 'text-green-600' : feedbackMessage.includes('Incorrect') ? 'text-red-600' : 'text-yellow-600'}`}>
          {feedbackMessage}
        </p>
      )}
      <button
        onClick={handleNextQuestion}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  </div>
);

export default QuestionsPage;
