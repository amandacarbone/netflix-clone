import { useState } from "react";
import "../styles/GetStarted.css";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

export default function GetStartedScreen() {

    const [ signIn, setSignIn ] = useState(false);
    const [ signUp, setSignUp ] = useState(false);

    return (
        <div className="getStartedScreen">
            <div className="getStartedScreenBackground">
                <img
                    className="getStartedScreenLogo"
                    src="https://i.imgur.com/rOIeFnc.png" 
                    alt="netflix"
                    onClick={(() => setSignIn(false)) && (() => setSignUp(false))}
                />
                <button 
                    className="SignInButton"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>
                <div className="getStartedScreenGradient"/>
            </div>
            <div className="getStartedScreenBody">
                {signIn ? (
                    <SignInScreen/>
                ) : signUp ? (
                    <SignUpScreen/>
                ) : (
                    <>
                        <h1>
                            Unlimited movies, TV shows, and more.
                        </h1>
                        <h2>
                            Watch anywhere. Cancel anytime.
                        </h2>
                        <h3>
                            Ready to watch? Enter your email to create or restart your membership.
                        </h3>
                        <div className="getStartedScreenInput">
                            <form>
                                {/* <input 
                                    type="email"
                                    placeholder="Email"
                                /> */}
                                <button 
                                    className="getStartedScreenButton"
                                    onClick={() => setSignUp(true)}
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};