import React, { useState } from 'react'

const Home = () => {
  const [nweet, setNweet] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(nweet)
  }

  const handleOnChange = (e) => {
    const {
      target: { value },
    } = e
    setNweet(value)
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={handleOnChange} />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  )
}
export default Home
