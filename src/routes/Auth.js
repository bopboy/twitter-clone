import React, { useState } from "react"

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onChange = (e) => {
        const { target: { name, value } } = e
        if (name === "email") setEmail(value)
        else if (name === "password") setPassword(value)
    }
    return (
        <div>
            <form>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value="로그인" />
            </form>
            <div>
                <button>Login with Google</button>
                <button>Login with Github</button>
            </div>
        </div>
    )
}

export default Auth