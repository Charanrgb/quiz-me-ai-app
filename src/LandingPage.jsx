import React from 'react';

// Component for the Landing Page
const LandingPage = ({ onStartQuiz }) => (
  <div className="text-center">
    <div className="hero-section mb-8">
      <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">🎓 Quiz Me AI</h1>
      <p className="text-2xl text-blue-300 mb-2 font-light">Elevate Your Learning Journey</p>
      <p className="text-lg text-white opacity-90">Transform your study experience with AI-powered interactive quizzes</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div className="feature-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-400 border-opacity-30 transform hover:scale-105 transition-transform duration-300">
        <div className="feature-icon text-4xl mb-3">🤖</div>
        <h3 className="text-xl font-semibold text-blue-300 mb-2">AI-Powered</h3>
        <p className="text-white text-opacity-80">Unique questions generated for every quiz session</p>
      </div>
      <div className="feature-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-400 border-opacity-30 transform hover:scale-105 transition-transform duration-300">
        <div className="feature-icon text-4xl mb-3">📊</div>
        <h3 className="text-xl font-semibold text-blue-300 mb-2">Track Progress</h3>
        <p className="text-white text-opacity-80">Get instant feedback and performance insights</p>
      </div>
      <div className="feature-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-400 border-opacity-30 transform hover:scale-105 transition-transform duration-300">
        <div className="feature-icon text-4xl mb-3">🔄</div>
        <h3 className="text-xl font-semibold text-blue-300 mb-2">Unlimited Practice</h3>
        <p className="text-white text-opacity-80">Generate new quizzes anytime you want</p>
      </div>
      <div className="feature-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-400 border-opacity-30 transform hover:scale-105 transition-transform duration-300">
        <div className="feature-icon text-4xl mb-3">🧠</div>
        <h3 className="text-xl font-semibold text-blue-300 mb-2">Adaptive Learning</h3>
        <p className="text-white text-opacity-80">Quizzes adjust to your learning style</p>
      </div>
    </div>

    <div className="cta-section my-8">
      <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Learning?</h2>
      <button
        onClick={onStartQuiz}
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Start Quiz Now
      </button>
    </div>
  </div>
);

export default LandingPage;
