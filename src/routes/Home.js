import React, { useEffect, useRef, useState } from "react"
import { dbInstance } from "fbase"
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import Tweet from "components/Tweet"

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])
    const [attachment, setAttachment] = useState("")
    const ref = useRef()
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
    const onFileChange = (e) => {
        const { target: { files } } = e
        const theFile = files[0]
        const reader = new FileReader()
        reader.onloadend = (e) => {
            const { currentTarget: { result } } = e
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }
    const onClearAttachment = () => setAttachment(null)
    return (
        <div>
            {tweets.map(t => (<Tweet key={t.id} tweetObj={t} isOwner={t.creatorId === userObj.uid} />))}
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" maxLength={120} onChange={onChange} value={tweet} />
                <input type="submit" value="tweet" />&nbsp;
                <input type="file" accept="image/*" onChange={onFileChange} />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
        </div >
    )
}
export default Home