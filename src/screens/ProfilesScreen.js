import "../styles/ProfileScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../components/Nav";
import PlansScreen from "./PlansScreen";

export default function ProfileScreen() {

    const user = useSelector(selectUser);

    return (
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreenBody">
                <h1>Edit Profile</h1>
                <div className="profileScreenInfo">
                    <img
                        src="https://i.imgur.com/uIfWTTL.png"
                        alt="profileAvatar"
                    />
                    <div className="profileScreenDetails">
                        <h2>{user.email}</h2>
                        <div className="profileScreenPlans">
                            <h3>Plans</h3>
                            <PlansScreen/>
                            <button
                                className="profileScreenSignOut"
                                onClick={() => auth.signOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};