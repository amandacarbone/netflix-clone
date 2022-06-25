import { useRef, useState } from "react";
import { auth } from "../firebase";
import "../styles/Account.css";
import SignInScreen from "./SignInScreen";

export default function SignUpScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [ signIn, setSignIn ] = useState(false);

    function signUp(e) {
        e.preventDefault();
        
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div>
            {signIn ? (
                <SignInScreen/>
            ) : (
                <div className="accountScreen">
                    <form>
                        <h1>Sign Up</h1>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            onClick={signUp}
                        >
                            Sign Up
                        </button>
                        <h4>
                            <span className="accountScreenGray">Have an account? </span>
                            <span className="accountScreenLink" onClick={() => setSignIn(true)}>Sign in now.</span>
                        </h4>
                    </form>
                </div>
            )}
        </div>
    );

};