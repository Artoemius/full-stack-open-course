import { useState } from 'react'

const Header = ({text}) => <div><h1>{text}</h1></div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({text, value}) => {
 // if (isNaN(value)) {value = ' '}
  if (text === 'positive') {value = value+' %'}
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>  
    </tr>
    )
}

const Statistics = (props) => {
  if (props.all===0) {
    return(<div>No feedback given</div>)
  }
  return(
    <table>
      <tbody>
      <StatisticsLine text='good' value={props.good}/>
      <StatisticsLine text='neutral' value={props.neutral}/>
      <StatisticsLine text='bad' value={props.bad}/>
      <StatisticsLine text='all' value={props.all}/>
      <StatisticsLine text='average' value={props.average}/>
      <StatisticsLine text='positive' value={props.positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handlePositiveClick = () => {
    setGood(good+1)
    setTotal(total+1)
    setScore(score+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const handleNegativeClick = () => {
    setBad(bad+1)
    setTotal(total+1)
    setScore(score-1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={handlePositiveClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleNegativeClick} text='bad'/>
      <Header text='statistics'/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        average={score/total}
        positive={good*100/total}
      />
    </div>
  )
}

export default App