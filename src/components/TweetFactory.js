import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { storageService, dbInstance } from "fbase"
import { ref as ref2, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("")
    const [attachment, setAttachment] = useState("")
    const [attachmentRef, setAttachmentRef] = useState("")
    const onChange = (e) => {
        const { target: { value } } = e
        setTweet(value)
    }
    const onSubmit = async (e) => {
        if (tweet === "") return
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
    const onClearAttachment = () => setAttachment("")
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input type="text" placeholder="what's on your mind?" maxLength={120} onChange={onChange} value={tweet} className="factoryInput__input" />
                <input type="submit" value="tweet" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add Images</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input type="file" id='attach-file' accept="image/*" onChange={onFileChange} style={{ opacity: 0 }} />
            {
                attachment && (
                    <div className="factoryForm__attachment">
                        <img src={attachment} style={{ backgroundImage: attachment }} />
                        <div onClick={onClearAttachment} className="factoryForm_clear">
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                )
            }
        </form >
    )
}
export default TweetFactory