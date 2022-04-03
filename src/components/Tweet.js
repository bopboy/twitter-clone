import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref as ref2, deleteObject } from 'firebase/storage'
import { dbInstance, storageService } from 'fbase'

const Tweet = ({ tweetObj, isOwner, attachmentRef }) => {
    const [editing, setEditing] = useState(false)
    const [editTweet, setEditTweet] = useState(tweetObj.text)
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure?")
        if (ok) {
            await deleteDoc(doc(dbInstance, `tweets/${tweetObj.id}`))
            await deleteObject(ref2(attachmentRef))
        }
    }
    const toggleEditing = () => setEditing(prev => !prev)
    const onSubmit = async (e) => {
        e.preventDefault()
        await updateDoc(doc(dbInstance, `tweets/${tweetObj.id}`), { text: editTweet })
        setEditing(false)
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setEditTweet(value)
    }
    return (
        <div>{editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Edit your tweet" value={editTweet} onChange={onChange} required />
                    <input type="submit" value="Update" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>
        ) : (
            <>
                <h4>{tweetObj.text}</h4>
                {tweetObj.attachmentUrl && (<img src={tweetObj.attachmentUrl} width="50px" height="50px" />)}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete</button>
                        <button onClick={toggleEditing}>Edit</button>
                    </>
                )}
            </>
        )
        }</div>
    )
}
export default Tweet