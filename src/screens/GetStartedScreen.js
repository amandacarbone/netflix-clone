import { useState } from "react";
import "../styles/LoginScreen.css";
import SignInScreen from "./SignInScreen";

export default function GetStartedScreen() {

    const [ signIn, setSignIn ] = useState(false);

    return (
        <div className="loginScreen">
            <div className="loginScreenBackground">
                <img
                    className="loginScreenLogo"
                    src="https://i.imgur.com/rOIeFnc.png" 
                    alt="netflix"
                />
                <button 
                    className="loginScreenButton"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>
                <div className="loginScreenGradient"/>
            </div>
            <div className="loginScreenBody">
                {signIn ? (
                    <SignInScreen/>
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
                        <div className="loginScreenInput">
                            <form>
                                <input 
                                    type="email"
                                    placeholder="Email"
                                />
                                <button 
                                    className="loginScreenGetStarted"
                                    onClick={() => setSignIn(true)}
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