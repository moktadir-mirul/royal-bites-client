import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({children}) => {
    
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const handleUserReg = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const handleUpdateUser = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {displayName: name, photoURL: photoUrl});
    } 

    const handleUserSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    } 

    const handleSignOut = () => {
        return signOut(auth);
    }
    const handleResetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUserInfo(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authObjects = {handleGoogleSignIn, handleUserReg, handleUpdateUser, handleUserSignIn, handleSignOut, handleResetPassword, userInfo, loading, foods, setFoods}

    return (
        <AuthContext value={authObjects}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;