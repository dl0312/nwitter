import React, { useState, useEffect } from 'react'
import { db } from 'fbase'
import { collection, addDoc, getDocs, serverTimestamp } from '@firebase/firestore'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  useEffect(() => {
    const getNweets = async () => {
      const dbNweets = await getDocs(collection(db, 'nweets'))
      dbNweets.forEach((document) => {
        const nweetObject = {
          ...document.data(),
          id: document.id,
        }
        setNweets((prev) => [nweetObject, ...prev])
      })
      // setNweets(dbNweets.map((document) => document.data()))
    }
    getNweets()
  }, [])

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
      <div>
        {nweets.map(({ id, nweet }) => (
          <div key={id}>
            <h4>{nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
