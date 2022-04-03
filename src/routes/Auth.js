import React from "react"
import { authService } from "fbase"
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth"
import AuthForm from "components/AuthForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"

const Auth = () => {
    const onSocialClick = async (e) => {
        const { target: { name } } = e
        let provider
        if (name === "google") provider = new GoogleAuthProvider()
        else if (name === "github") provider = new GithubAuthProvider()
        const data = await signInWithPopup(authService, provider)
    }
    return (
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"04AAFF"} size="3x" />
            <AuthForm />
            <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">Login with Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button name="github" onClick={onSocialClick} className="authBtn">Login with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div >
        </div >
    )
}

export default Auth