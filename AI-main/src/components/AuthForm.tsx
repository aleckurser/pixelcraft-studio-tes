import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Logged in as ${user.displayName}`);
    } catch (error) {
      alert('Google Sign-In Error: ' + error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-red-500 text-white px-4 py-2 rounded w-full"
    >
      Sign in with Google
    </button>
  );
}

export default GoogleSignInButton;
