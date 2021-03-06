import React, { useState, useEffect } from 'react'
import { db } from 'fbase'
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from '@firebase/firestore'

const Home = ({ user }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  useEffect(() => {
    // 실시간으로 데이터를 데이터베이스에서 가져오기

    const q = query(collection(db, 'nweets'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nextNweets = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      setNweets(nextNweets)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const docRef = await addDoc(collection(db, 'nweets'), {
      text: nweet,
      createdAt: serverTimestamp(),
      creatorId: user.uid,
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
        {nweets.map(({ id, text }) => (
          <div key={id}>
            <h4>{text}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
