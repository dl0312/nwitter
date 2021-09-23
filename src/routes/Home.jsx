import React, { useState } from 'react'
import { db } from 'fbase'
import { collection, addDoc, serverTimestamp } from '@firebase/firestore'

const Home = () => {
  const [nweet, setNweet] = useState('')

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const docRef = await addDoc(collection(db, 'nweets'), {
      nweet,
      createdAt: serverTimestamp(),
    })

    console.log('Document written with ID: ', docRef.id)

    setNweet('')
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
        <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={handleOnChange} value={nweet} />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  )
}
export default Home
