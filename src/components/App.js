import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) setIsLoggedIn(true)
      else setIsLoggedIn(false)
      setInit(true)
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "초기화 중..."}
      <hr />
      <footer>&copy; {new Date().getFullYear()} Twitter-Clone</footer>
    </>
  );
}

export default App;
