import { getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase.utils'

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component'

import "./sign-in-form.styles.scss"
const defaultFormFields = {
  email: "",
  password: ""
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      // setCurrentUser(response.user)

    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Credentials do not match. Incorrect email/password");
          break;
        case "auth/user-not-found":
          alert("User not found. Please register");
          break;
        default:
          console.log(err);
      }
    } finally {
      setFormFields(defaultFormFields);
    }
  }

  return (
    <div>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password / Google</span>
      <form onSubmit={handleSubmit}>
        <FormInput type="email" required onChange={handleInputChange} label="Email" name="email" value={email} />
        <FormInput type="password" required onChange={handleInputChange} label="Password" name="password" value={password} />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm