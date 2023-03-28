import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase.utils";



// value to be accessed
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,

})

// provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const value = {
    currentUser,
    setCurrentUser
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user)
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}