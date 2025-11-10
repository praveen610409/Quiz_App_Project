import React, { useRef, useState } from 'react';
import './Quiz.css';
import { QuizQuestions } from '../assets/Question';

const Quiz = () => {

    let [index , setIndex] = useState(0);
    let [question , setQuestion] = useState(QuizQuestions[index]);
    let [lock , setLock] = useState(false)
    let [score , SetScore] = useState(0);
    let [result, SetResult] = useState(false);


    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [ Option1 , Option2 , Option3 ,Option4]

    const checkAns = (e, ans ) => {
        if (lock === false ){
            if (question.answer === ans) {
            e.target.classList.add("Correct")
            setLock(true);
            SetScore(prev =>prev+1)
        }
        else{
            e.target.classList.add("Wrong")
            setLock(true)
            option_array[question.answer-1].current.classList.add("Correct")
        }
        }

    }

    const next = () => {
        if (lock === true) {
            if (index === QuizQuestions.length-1){
                SetResult(true);
                return 0;
            }
            setIndex(++index)
            setQuestion(QuizQuestions[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("Wrong");
                option.current.classList.remove("Correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion (QuizQuestions[0]);
        SetScore (0);
        setLock(false);
        SetResult(false);
    }



    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr/>
            {result ? <></> : <>
            <h2>Q{index+1}:) {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e)=>{ checkAns(e,1)}}>A-) {question.option1}</li>
                <li ref={Option2} onClick={(e)=>{ checkAns(e,2)}}>B-) {question.option2}</li>
                <li ref={Option3} onClick={(e)=>{ checkAns(e,3)}}>C-) {question.option3}</li>
                <li ref={Option4} onClick={(e)=>{ checkAns(e,4)}}>D-) {question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className='index'>{index+1} Of {QuizQuestions.length} Question</div>
            </>}
            {result ? <>
            <h2>Your Scored {score} out of {QuizQuestions.length} </h2>
            <button onClick={reset}>Reset</button>
            </> : <></>}

        </div>
    )
}

export default Quiz
