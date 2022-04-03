import React, { useEffect, useState } from "react"
import { authService, dbInstance } from "fbase"
import { signOut, updateProfile } from 'firebase/auth'
import { useHistory } from "react-router-dom"
import { collection, getDocs, orderBy, where } from "firebase/firestore"

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        signOut(authService)
        history.push("/")
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setNewDisplayName(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName })
            refreshUser()
        }
    }
    // const getMyTweets = async () => {
    //     const res = await getDocs(collection(dbInstance, "tweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt"))
    // }
    // useEffect(() => {
    //     getMyTweets()
    // }, [])
    return (
        <>
            <span>Profile</span>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="display name" value={newDisplayName} />
                <input type="submit" value="update" />
            </form>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
}
export default Profile