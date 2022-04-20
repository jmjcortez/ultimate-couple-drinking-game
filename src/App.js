import { useEffect, useState } from 'react';

import './App.css';

import {
  questions as questionsDb,
  dares as daresDb,
  howWell as howWellDb,
  mostLikely as mostLikelyDb,
} from "./data";

function App() {

  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState(questionsDb)
  const [dares, setDares] = useState(daresDb)
  const [howWell, setHowWell] = useState(howWellDb)
  const [mostLikely, setMostLikely] = useState(mostLikelyDb)
  const [firstPlayerScore, setFirstPlayerScore] = useState(0)
  const [secondPlayerScore, setSecondPlayerScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('question')
  const [counter, setCounter] = useState(-1)

  const generateQuestion = async () => {

    let index;

    if (counter < 10) {
      setStatus('Question')

      index = questions[Math.floor(Math.random() * questions.length)];
      setQuestion(index);
      setQuestions(questions.filter((q) => ( q !== index )));
      // await setQuestions(questions.splice(index, 1));
      console.log(questions);
    }
    // else if (counter >= 10 && counter < 16) {
    else if (counter >= 12 && counter < 18) {
      setStatus('Most Likely')
      console.log(mostLikely)
      index = mostLikely[Math.floor(Math.random() * mostLikely.length)];
      setQuestion(index);
      setMostLikely(mostLikely.filter((q) => ( q !== index )));
      
    }
    else if (counter >= 10 && counter < 12) {
    // else if (counter >= 16 && counter < 18) {
      setStatus('How Well')

      index = howWell[Math.floor(Math.random() * howWell.length)];
      setQuestion(index);
      setHowWell(howWell.filter((q) => ( q !== index )));
      
    }
    else {
      setStatus('dare')

      index = dares[Math.floor(Math.random() * dares.length)];
      setQuestion(index);
      setDares(dares.filter((q) => ( q !== index )));
      
    }

    if (counter < 19) {
      setCounter(counter + 1)
    }

    if (counter === 19) {
      setCounter(0)
    }

  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const toggleLoading = async () => {
    setLoading(true);
    // await delay(1500)
    await delay(500)
    setLoading(false)
  }

  useEffect(() => {
    return () => {
      // return setQuestion( questionsDb[Math.floor(Math.random() * questionsDb.length)] );
      return generateQuestion();
    }
  }, [])

  return (
    <div className="App">
      <div className='sides left-side'>
        <h1 className='shot-counter'>Shot counter</h1>

        <div className='players'>
          <div className='player-name-container left-player'>
            <h1 className='score'>
              {firstPlayerScore}
            </h1>
            <div className='name'>Jared</div>
            <button
              className='plusButton'
              onClick={() => {
                setFirstPlayerScore(firstPlayerScore + 1)
              }}
            >+</button>
          </div>
          <div className='player-name-container right-player'>
            <h1 className='score'>
              {secondPlayerScore}
            </h1>
            <div className='name'>Olena</div>
            <button
              className='plusButton'
              onClick={() => {
                setSecondPlayerScore(secondPlayerScore + 1)
              }}
            >+</button>
          </div>
        </div>

        <button className='generate-button' onClick={() => {
          toggleLoading(true);
          generateQuestion();
        }}>
          Generate Question
        </button>
      </div>
      <div className='sides right-side'>
        {
          loading ? (
            <div className='loader'>
              <div className='outer'></div>
              <div className='middle'></div>
              <div className='inner'></div>
              <div className='dot'></div>
            </div>
          ) :
            (
              <div className='card'>
                <div className='face1'>
                  <div className='img-box'>
                    <h1>{status}</h1>
                  </div>
                </div>
                <div className='face2'>
                  <div className='content'>
                    <p className=''>
                      {question}
                    </p>
                  </div>
                </div>
              </div>
            )
        }


      </div>

    </div>
  );
}

export default App;
