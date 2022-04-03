import React, { useEffect, useRef, useState } from "react"
import { dbInstance, storageService } from "fbase"
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import { ref as ref2, uploadString, getDownloadURL } from 'firebase/storage'
import Tweet from "components/Tweet"
import { v4 as uuidv4 } from 'uuid'

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
        let attachmentUrl = ""
        if (attachment != "") {
            const fileRef = ref2(storageService, `${userObj.uid}/${uuidv4()}`)
            await uploadString(fileRef, attachment, 'data_url')
            attachmentUrl = await getDownloadURL(fileRef)
        }
        const newTweet = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await addDoc(collection(dbInstance, "tweets"), newTweet)
        setTweet("")
        setAttachment("")
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