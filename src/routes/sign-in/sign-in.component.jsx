import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUp from '../../components/sign-up/sign-up.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect()
    console.log(user)
  }
  return (
    <div>
      <h1>sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <SignUp />
    </div>
  )
}

export default SignIn
