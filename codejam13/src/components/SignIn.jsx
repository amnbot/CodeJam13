import { auth, provider} from '../utils/firestoreConfigSetter';
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { eventEmitter } from '../utils/eventEmitter';

const SignIn = () => {
  const logGoogleUser = async () => {
    {
      const result = await signInWithPopup(auth, provider);
      try {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        const profile = getAdditionalUserInfo(result).profile;
        
        console.log(profile);
      } catch (error) {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      }
    }
  };
  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  );
};
export default SignIn;