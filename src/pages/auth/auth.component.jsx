import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

import { motion } from "framer-motion"
import './auth.styles.scss'


const Auth = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="auth-container">
      <SignInForm />
      <SignUpForm />
    </motion.div>
  )
}

export default Auth