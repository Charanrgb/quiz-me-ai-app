import React from 'react';

// Component for the Home Page (Quiz Generation)
const HomePage = ({ topic, setTopic, difficulty, setDifficulty, numQuestions, setNumQuestions, onGenerateQuiz, onAboutClick, isLoading, error }) => (
  <div className="text-center">
    <div className="flex justify-start mb-4">
      <button
        onClick={onAboutClick}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        About
      </button>
    </div>
    <h1 className="text-4xl font-bold text-white mb-6">Create Your Custom Quiz</h1>

    <div className="space-y-6 text-left">
      <div>
        <label htmlFor="topic" className="block text-white text-lg font-medium mb-2">Enter the topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., World History, Physics, Literature"
          className="w-full bg-white bg-opacity-10 border border-blue-400 border-opacity-30 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
        />
      </div>

      <div>
        <label htmlFor="difficulty" className="block text-white text-lg font-medium mb-2">Select difficulty level:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full bg-white bg-opacity-10 border border-blue-400 border-opacity-30 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="easy" className="bg-gray-800 text-white">Easy</option>
          <option value="medium" className="bg-gray-800 text-white">Medium</option>
          <option value="hard" className="bg-gray-800 text-white">Hard</option>
        </select>
      </div>

      <div>
        <label htmlFor="numQuestions" className="block text-white text-lg font-medium mb-2">How many questions would you like in your quiz? ({numQuestions})</label>
        <input
          type="range"
          id="numQuestions"
          min="1"
          max="20"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
        />
      </div>
    </div>

    <button
      onClick={onGenerateQuiz}
      disabled={isLoading}
      className={`w-full mt-8 py-3 px-6 rounded-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75
        ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'}`}
    >
      {isLoading ? 'Generating Questions...' : 'Generate Questions'}
    </button>

    {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
  </div>
);

export default HomePage;
