import { getDoc } from 'firebase/firestore'
import React from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'


const Auth = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(response.user)
    const userSnapshot= await getDoc(userDocRef)
    console.log(userSnapshot.data())
  }
  return (
    <div>Auth Page
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm />
    </div>
  )
}

export default Auth