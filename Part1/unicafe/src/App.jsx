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

const Anecdote = (props) => {
  const {anecdotes, anecdoteSelected, votes} = props
  if (isNaN(votes[anecdoteSelected])) {votes[anecdoteSelected] = 0}
  return (
    <div>
      <p>{anecdotes[anecdoteSelected]}</p>
      <p>Has {votes[anecdoteSelected]} votes</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)
  const [anecdoteSelected, setAnecdoteSelected] = useState(0)
  const [votes, setVotes] = useState([])

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

  const handleAnecdoteSelected = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setAnecdoteSelected(randomIndex)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[anecdoteSelected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Header text = 'Anecdote'/>
      <Anecdote anecdotes={anecdotes} anecdoteSelected={anecdoteSelected} votes={votes}/>
      <Button onClick={handleVote} text = 'vote'/>
      <Button onClick={handleAnecdoteSelected} text='next anecdote'/>
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