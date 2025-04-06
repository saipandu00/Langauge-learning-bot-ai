import React, { useState } from 'react';
import { Book, Globe, MessageCircle, Brain, CheckCircle2, XCircle } from 'lucide-react';

type Question = {
  text: string;
  options: string[];
  correct: number;
};

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('spanish');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const questions: Question[] = [
    {
      text: "How do you say 'Hello' in Spanish?",
      options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
      correct: 0
    },
    {
      text: "What does 'Gracias' mean?",
      options: ['Goodbye', 'Please', 'Thank you', 'Welcome'],
      correct: 2
    },
    {
      text: "How do you say 'Good morning' in Spanish?",
      options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Adiós'],
      correct: 1
    }
  ];

  const handleAnswerSubmit = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Language Learning Bot</h1>
          <p className="text-gray-600">Master languages through interactive learning</p>
        </header>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          {!showResult ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Book className="text-indigo-600" />
                  <span className="text-gray-700">Question {currentQuestion + 1}/{questions.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="text-indigo-600" />
                  <span className="text-gray-700">Score: {score}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{questions[currentQuestion].text}</h2>
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSubmit(index)}
                      className="w-full text-left px-6 py-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                {score > questions.length / 2 ? (
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
              <p className="text-gray-600 mb-6">
                You scored {score} out of {questions.length} questions correctly.
              </p>
              <button
                onClick={resetQuiz}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>Practice makes perfect! Keep learning.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;