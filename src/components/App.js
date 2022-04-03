import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj({ displayName: user.displayName, uid: user.uid, updateProfile: args => user.updateProfile(args) })
      } else {
        setIsLoggedIn(false)
        setUserObj(null)
      }
      setInit(true)
    })
    return setUserObj(null)
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({ displayName: user.displayName, uid: user.uid, updateProfile: args => user.updateProfile(args) })
  }
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : "초기화 중..."}
      <footer style={{ textAlign: "center", marginTop: 20 }}>&copy; {new Date().getFullYear()} Twitter-Clone</footer>
    </>
  );
}

export default App;
