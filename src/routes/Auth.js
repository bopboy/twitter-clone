import React, { useState } from "react"
import { authService } from "fbase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
    const onChange = (e) => {
        const { target: { name, value } } = e
        if (name === "email") setEmail(value)
        else if (name === "password") setPassword(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let data
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password)
            } else {
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data)
        } catch (error) {
            setError(error.message)
        }
    }
    const toggleAccount = () => setNewAccount(prev => !prev)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "계성 생성" : "로그인"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정 생성"}</span>
            <div>
                <button>Login with Google</button>
                <button>Login with Github</button>
            </div>
        </div>
    )
}

export default Auth