import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage'; // Import the LandingPage component
import HomePage from './HomePage';       // Import the HomePage component
import QuestionsPage from './QuestionsPage'; // Import the QuestionsPage component
import ScorePage from './ScorePage';     // Import the ScorePage component
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Main App component
const App = () => {
  // State to manage the current page view
  const [currentPage, setCurrentPage] = useState('landing');
  // State for quiz generation inputs
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);
  // State for generated quiz questions and user answers
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  // State for current quiz progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]); // To store details of wrong questions
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Tracks selected option for current question

  // Function to handle starting the quiz from the landing page
  const handleStartQuiz = () => {
    setCurrentPage('home');
    resetQuizStates(); // Reset any previous quiz data
  };

  // Function to handle navigating back to the landing page from home/quiz
  const handleAboutClick = () => {
  resetQuizStates('landing');
  };

  // Resets all quiz-related states
  const resetQuizStates = (page = null) => {
  setQuestions([]);
  setUserAnswers([]);
  setCurrentQuestionIndex(0);
  setScore(0);
  setWrongQuestions([]);
  setIsLoading(false);
  setError('');
  setFeedbackMessage('');
  setSelectedOptionIndex(null);

  if (page) setCurrentPage(page);
};


  // Function to generate questions using the Gemini API
  const generateQuizQuestions = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate questions.');
      return;
    }

    setIsLoading(true);
    setError('');
    setQuestions([]); // Clear previous questions
    setUserAnswers([]); // Clear previous answers
    setScore(0);
    setWrongQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);

    try {
      // Construct the prompt for the AI model
      const prompt = `Generate exactly ${numQuestions} multiple-choice questions about ${topic} at a ${difficulty} level. Provide each question in this exact format: Question;Choice1;Choice2;Choice3;Choice4;CorrectAnswer. Ensure the correct answer is one of the choices provided.`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      // Make the API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();

      // Parse the AI's response
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const responseText = result.candidates[0].content.parts[0].text.trim();
        const rawQuestions = responseText.split("\n");

        const parsedQuestions = [];
        for (const q of rawQuestions) {
          const parts = q.split(";");
          if (parts.length === 6) {
            const questionText = parts[0].trim();
            const choices = parts.slice(1, 5).map(choice => choice.trim());
            const correctAnswer = parts[5].trim();

            // Validate if correct answer is actually in choices
            if (choices.some(choice => choice.toLowerCase() === correctAnswer.toLowerCase())) {
              const answerOptions = choices.map(choice => ({
                answerText: choice,
                isCorrect: choice.toLowerCase() === correctAnswer.toLowerCase(),
              }));
              parsedQuestions.push({ questionText, answerOptions, correctAnswer });
            } else {
              console.warn(`Skipping malformed question (correct answer not in choices): ${q}`);
            }
          } else {
            console.warn(`Skipping malformed question (wrong number of parts): ${q}`);
          }
        }

        if (parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
          setUserAnswers(Array(parsedQuestions.length).fill(null));
          setCurrentPage('questions'); // Navigate to the questions page
        } else {
          setError('Failed to generate valid questions. Please try again with different inputs.');
        }
      } else {
        setError('No valid response from AI. Please try again.');
      }
    } catch (err) {
      console.error("Error generating questions:", err);
      setError(`Error generating questions: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles the selection of an answer option
  const handleAnswerOptionClick = (isCorrect, selectedText, optionIndex) => {
    // Only allow selection if an answer hasn't been chosen yet for this question
    if (userAnswers[currentQuestionIndex] === null) {
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[currentQuestionIndex] = selectedText;
      setUserAnswers(updatedUserAnswers);
      setSelectedOptionIndex(optionIndex); // Store the index of the selected option

      if (isCorrect) {
        setFeedbackMessage('Correct!');
      } else {
        setFeedbackMessage('Incorrect!');
      }
    }
  };

  // Handles moving to the next question or submitting the quiz
  const handleNextQuestion = () => {
    // Check if an answer has been selected before proceeding
    if (userAnswers[currentQuestionIndex] === null) {
      setFeedbackMessage('Please select an answer before proceeding!');
      return;
    }

    // Clear feedback and selected option for the next question
    setFeedbackMessage('');
    setSelectedOptionIndex(null);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      // If no more questions, calculate final score and show score screen
      calculateFinalScore();
      setCurrentPage('score');
    }
  };

  // Calculates the final score and identifies wrong questions
  const calculateFinalScore = () => {
    let finalScore = 0;
    const incorrectQuestions = [];
    questions.forEach((q, index) => {
      if (userAnswers[index] && userAnswers[index].toLowerCase() === q.correctAnswer.toLowerCase()) {
        finalScore += 1;
      } else {
        incorrectQuestions.push({
          questionNumber: index + 1,
          questionText: q.questionText,
          yourAnswer: userAnswers[index] || 'No answer',
          correctAnswer: q.correctAnswer,
        });
      }
    });
    setScore(finalScore);
    setWrongQuestions(incorrectQuestions);
  };

  // Effect to clear feedback message after a short delay
  useEffect(() => {
    let timer;
    if (feedbackMessage && feedbackMessage !== 'Please select an answer before proceeding!') {
      timer = setTimeout(() => {
        setFeedbackMessage('');
      }, 1500); // Clear feedback after 1.5 seconds
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [feedbackMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="w-full max-w-2xl">
        {currentPage === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
        {currentPage === 'home' && (
          <HomePage
            topic={topic}
            setTopic={setTopic}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            numQuestions={numQuestions}
            setNumQuestions={setNumQuestions}
            onGenerateQuiz={generateQuizQuestions}
            onAboutClick={handleAboutClick}
            isLoading={isLoading}
            error={error}
          />
        )}
        {currentPage === 'questions' && questions.length > 0 && (
          <QuestionsPage
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            answerOptions={questions[currentQuestionIndex].answerOptions}
            handleAnswerOptionClick={handleAnswerOptionClick}
            handleNextQuestion={handleNextQuestion}
            feedbackMessage={feedbackMessage}
            selectedOptionIndex={selectedOptionIndex}
            userSelectedAnswer={userAnswers[currentQuestionIndex]}
          />
        )}
        {currentPage === 'score' && (
          <ScorePage
            score={score}
            totalQuestions={questions.length}
            wrongQuestions={wrongQuestions}
            onRestartQuiz={() => resetQuizStates('home')} // ← here
            onReturnHome={() => { resetQuizStates('home'); }} // ← and here
          />
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 right-0 p-4 text-white text-sm opacity-80">
        Created by Sai Charan
      </div>
    </div>
  );
};

export default App;
