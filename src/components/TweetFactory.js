import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { storageService, dbInstance } from "fbase"
import { ref as ref2, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("")
    const [attachment, setAttachment] = useState("")
    const [attachmentRef, setAttachmentRef] = useState("")
    const onChange = (e) => {
        const { target: { value } } = e
        setTweet(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        let attachmentUrl = ""
        if (attachment !== "") {
            const fileRef = ref2(storageService, `${userObj.uid}/${uuidv4()}`)
            setAttachmentRef(fileRef)
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
    )
}
export default TweetFactory