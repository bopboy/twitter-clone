import React, { useEffect, useState } from "react"
import { dbInstance } from "fbase"
import { collection, addDoc, getDocs } from 'firebase/firestore'

const Home = () => {
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])
    const getTweets = async () => {
        const tweetsFromDB = await getDocs(collection(dbInstance, "tweets"))
        tweetsFromDB.forEach(doc => {
            const tweetObj = { ...doc.data(), id: doc.id }
            setTweets(prev => [tweetObj, ...prev])
        })
    }
    useEffect(() => {
        getTweets()
    }, [])
    const onChange = (e) => {
        const { target: { value } } = e
        setTweet(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await addDoc(collection(dbInstance, "tweets"), { tweet, createdAt: Date.now() })
        setTweet("")
    }
    return (
        <div>
            {tweets.map(t => (<div key={t.id}><h4>{t.tweet}</h4></div>))}
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" maxLength={120} onChange={onChange} value={tweet} />
                <input type="submit" value="tweet" />
            </form>
        </div >
    )
}
export default Home