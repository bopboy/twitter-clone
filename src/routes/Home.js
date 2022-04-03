import React, { useEffect, useState } from "react"
import { dbInstance } from "fbase"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Tweet from "components/Tweet"
import TweetFactory from "components/TweetFactory"

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([])
    const [attachmentRef, setAttachmentRef] = useState("")
    useEffect(() => {
        const q = query(collection(dbInstance, "tweets"), orderBy("createdAt", "desc"))
        onSnapshot(q, (snapshot) => {
            const tweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setTweets(tweetArray)
        })
    }, [])
    return (
        <div className="container">
            <TweetFactory userObj={userObj} />
            <div stlye={{ marginTop: 20 }}>
                {tweets.map(t => (<Tweet key={t.id} tweetObj={t} isOwner={t.creatorId === userObj.uid} attachmentRef={attachmentRef} />))}
            </div>
        </div >
    )
}
export default Home