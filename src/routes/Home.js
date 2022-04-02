import React, { useState } from "react"
import { dbInstance } from "fbase"
import { collection, addDoc } from 'firebase/firestore'

const Home = () => {
    const [tweet, setTweet] = useState("")
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
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" maxLength={120} onChange={onChange} />
                <input type="submit" value="Tweet" />
            </form>
        </div>
    )
}
export default Home