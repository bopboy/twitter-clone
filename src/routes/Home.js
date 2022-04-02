import React, { useEffect, useState } from "react"
import { dbInstance } from "fbase"
import { collection, addDoc, getDocs, onSnapshot, doc } from 'firebase/firestore'

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        onSnapshot(collection(dbInstance, "tweets"), (snapshot) => {
            const tweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setTweets(tweetArray)
        })
    }, [])
    const onChange = (e) => {
        const { target: { value } } = e
        setTweet(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await addDoc(collection(dbInstance, "tweets"), { text: tweet, createdAt: Date.now(), creatorId: userObj.uid })
        setTweet("")
    }
    return (
        <div>
            {tweets.map(t => (<div key={t.id}><h4>{t.text}</h4></div>))}
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" maxLength={120} onChange={onChange} value={tweet} />
                <input type="submit" value="tweet" />
            </form>
        </div >
    )
}
export default Home