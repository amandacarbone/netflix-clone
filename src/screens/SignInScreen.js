import { useRef, useState } from "react";
import { auth } from "../firebase";
import "../styles/Account.css";
import SignUpScreen from "./SignUpScreen";

export default function SignInScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [ signUp, setSignUp ] = useState(false);

    function signIn(e) {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        });

    };

    return (
        <div>
            {signUp ? (
                <SignUpScreen/>
            ) : (
                <div className="accountScreen">
                    <form>
                        <h1>Sign In</h1>
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
                            onClick={signIn}
                        >
                            Sign In
                        </button>
                        <h4>
                            <span className="accountScreenGray">New to Netflix? </span>
                            <span className="accountScreenLink" onClick={() => setSignUp(true)}>Sign up now.</span>
                        </h4>
                    </form>
                </div>
            )}
        </div>
    );

};