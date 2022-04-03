import React, { useEffect, useState } from "react"
import { dbInstance } from "fbase"
import { collection, onSnapshot } from 'firebase/firestore'
import Tweet from "components/Tweet"
import TweetFactory from "components/TweetFactory"

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([])
    const [attachmentRef, setAttachmentRef] = useState("")
    useEffect(() => {
        onSnapshot(collection(dbInstance, "tweets"), (snapshot) => {
            const tweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setTweets(tweetArray)
        })
    }, [])
    return (
        <div>
            {tweets.map(t => (<Tweet key={t.id} tweetObj={t} isOwner={t.creatorId === userObj.uid} attachmentRef={attachmentRef} />))}
            <hr />
            <TweetFactory userObj={userObj} />
        </div >
    )
}
export default Home