import React from "react"
import { authService } from "fbase"
import { signOut } from 'firebase/auth'
import { useHistory } from "react-router-dom"

const Profile = () => {
    const history = useHistory()
    const onLogOutClick = () => {
        signOut(authService)
        history.push("/")
    }
    return (
        <>
            <span>Profile</span>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
}
export default Profile