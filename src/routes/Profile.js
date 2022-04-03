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
            {/* <span>Profile</span> */}
            <div className="container">
                <form onSubmit={onSubmit} className="profileForm">
                    <input onChange={onChange} type="text" autoFocus placeholder="display name" value={newDisplayName} className="formInput" />
                    <input type="submit" value="update" className="formBtn" style={{ marginTop: 10 }} />
                </form>
                <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">Logout</span>
            </div>
        </>
    )
}
export default Profile