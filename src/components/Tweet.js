import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref as ref2, deleteObject } from 'firebase/storage'
import { dbInstance } from 'fbase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'


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
        <div className='tweet'>{editing ? (
            <>
                <form onSubmit={onSubmit} className='container tweetEdit'>
                    <input type="text" placeholder="Edit your tweet" value={editTweet} onChange={onChange} required autoFocus className='formInput' />
                    <input type="submit" value="Update" className='formBtn' />
                </form>
                <span onClick={toggleEditing} className='formBtn cancelBtn'>Cancel</span>
            </>
        ) : (
            <>
                <h4>{tweetObj.text}</h4>
                {tweetObj.attachmentUrl && (<img src={tweetObj.attachmentUrl} />)}
                {isOwner && (
                    <div className='tweet__actions'>
                        <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                        <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
                    </div>
                )}
            </>
        )
        }</div>
    )
}
export default Tweet