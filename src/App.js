import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import '../src/styles/App.css';
import HomeScreen from './screens/HomeScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import ProfileScreen from './screens/ProfilesScreen';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // Logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    // Clean up
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <GetStartedScreen/>
        ) : (
          <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
        </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
