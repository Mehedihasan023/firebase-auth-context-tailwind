/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.config'

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleAuthProvider= new GoogleAuthProvider();
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle =()=>{
        return signInWithPopup(auth, googleAuthProvider);
    }

    const logOut = ()=>{
     return signOut(auth);
    }
    useEffect(()=>{
      const unSubscribe=onAuthStateChanged(auth, currentUser=> {
            setUser(currentUser); 
            setLoading(false);
        });
        return ()=>{
            unSubscribe();
        }
    },[])
    
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;