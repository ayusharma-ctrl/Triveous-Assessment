"use client"
import React from 'react'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { auth, db } from '../firebaseconfig/index'
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LOGIN, LOGOUT, SET_USER_INFO } from '../store/reducers/UserReducer';


const Navbar = () => {
    // we will use this to update redux states
    const dispatch = useDispatch()
    // getting user data from redux state
    const userData = useSelector((state) => state.user)
    // importing this from firebase/auth
    const provider = new GoogleAuthProvider();

    // func to update the Firestore database
    const fetchData = async (email, displayName) => {
        // fecting document from db where email field have email of loggedin user
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // if such document exist with logged in user's information, then update redux state
            dispatch(SET_USER_INFO(docSnap.data()))
            // toast notification
            toast.success(`Welcome Back, ${displayName.split(" ")[0]}!`)
        } else {
            try {
                // Add a new document in collection "users"
                await setDoc(doc(db, "users", email), {
                    name: displayName,
                    email: email
                });
                // updating redux state
                dispatch(SET_USER_INFO({
                    name: displayName,
                    email: email,
                }))
                // toast notification
                toast.success(`Welcome Back, ${displayName.split(" ")[0]}!`)
            } catch (e) {
                console.log(e);
                // toast notification
                toast.error("Error: Something Went Wrong!")
            }
        }
    }

    // func to login to app
    const signIn = () => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        signInWithPopup(auth, provider)
            .then((result) => {
                // returns the user information after successful login along with token
                const { user } = result;
                // destructure the following from returned information
                const { email, displayName, photoURL } = user;
                // save this information to redux state
                dispatch(LOGIN({ email: email, displayName: displayName, photoURL: photoURL }))
                // calling below func to update the Firestore database
                fetchData(email, displayName);
            })
            .catch((error) => {
                // Handle Errors here.
                console.log("Error ===> ", error);
                toast.error("Error: Something Went Wrong!")
            });
    };

    // func to logout
    const logout = () => {
        dispatch(LOGOUT())
        // toast notification
        toast.success(`See you again, ${userData?.user?.displayName?.split(" ")[0]}!`)
    }

    return (
        <>
            <div className='flex justify-between items-center mt-0 bg-black w-full px-6 py-4'>
                <h1 className='text-lg font-extrabold italic text-lime-500'>NEWS-ify</h1>
                {
                    !userData?.isAuth ? (
                        <button onClick={signIn} className='px-4 py-1 rounded-md bg-lime-200 text-xs md:text-sm'>Login</button>
                    ) : (
                        <div className='flex items-center'>
                            <Image src={userData?.user?.photoURL} alt='dp' width={30} height={30} className='rounded-full mr-2' />
                            <button onClick={logout} className='px-4 py-1 rounded-md bg-lime-200 text-xs md:text-sm'>Logout</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Navbar