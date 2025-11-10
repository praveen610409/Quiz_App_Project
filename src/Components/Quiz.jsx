import React, { useRef, useState } from 'react';
import './Quiz.css';
import { QuizQuestions } from '../assets/Question';

const Quiz = () => {

    // --- states ---
    const [start, setStart] = useState(false); // 👈 new state for start screen
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(QuizQuestions[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    // --- refs ---
    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    // --- functions ---
    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.answer === ans) {
                e.target.classList.add("Correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("Wrong");
                setLock(true);
                option_array[question.answer - 1].current.classList.add("Correct");
            }
        }
    };

    const next = () => {
        if (lock) {
            if (index === QuizQuestions.length - 1) {
                setResult(true);
                return;
            }
            const newIndex = index + 1;
            setIndex(newIndex);
            setQuestion(QuizQuestions[newIndex]);
            setLock(false);
            option_array.forEach(option => {
                option.current.classList.remove("Wrong", "Correct");
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(QuizQuestions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setStart(false); // 👈 reset back to welcome screen
    };

    // --- UI ---
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />

            {/* 🌟 Welcome Screen */}
            {!start && !result && (
                <div className="welcome-screen">
                    <h2>✨ Welcome to the Quiz App ✨</h2>
                    <p>Test your knowledge and have fun!</p>
                    <button onClick={() => setStart(true)}>Start Quiz</button>
                </div>
            )}

            {/* 🧠 Quiz Questions */}
            {start && !result && (
                <>
                    <h2>Q{index + 1}: {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>A) {question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>B) {question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>C) {question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>D) {question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>{index + 1} of {QuizQuestions.length} Questions</div>
                </>
            )}

            {/* 🏁 Result Screen */}
            {result && (
                <>
                    <h2>Your Score: {score} / {QuizQuestions.length}</h2>
                    <button onClick={reset}>Play Again</button>
                </>
            )}
        </div>
    );
};

export default Quiz;
