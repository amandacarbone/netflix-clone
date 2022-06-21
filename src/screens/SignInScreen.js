import { useRef } from "react";
import { auth } from "../firebase";
import "../styles/SignUpScreen.css";

export default function SignInScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function register(e) {
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
        <div className="signUpScreen">
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
                    <span className="signUpScreenGray">New to Netflix? </span>
                    <span className="signUpScreenLink" onClick={register}>Sign up now.</span>
                </h4>
            </form>
        </div>
    );

};