import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISFAVORITE, TOGGLEDIALOG, TOGGLESAVEDNEWS } from '../store/reducers/NewsDataReducer';
import moment from 'moment';
import { StarIcon } from '@heroicons/react/solid';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import { db } from '../firebaseconfig';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

const NewsContent = () => {
    // state to check whether this news is favorite or not
    const [favorite, setFavorite] = useState(false)

    const dispatch = useDispatch();
    // get news data from state
    const preferenceData = useSelector((state) => state.news);
    const openDialog = preferenceData?.isDialog || false;
    const dialogData = preferenceData?.dialogData;
    const savedNews = preferenceData?.savedNews || [];
    // get user data from state
    const userData = useSelector((state) => state.user)

    // func to add or remove fav news from database and localstate
    const handleFavorite = async () => {
        // query to find and check if this news already exist in db or not
        const q = query(
            collection(db, "news"),
            where("email", "==", userData?.user?.email),
            where("title", "==", dialogData?.title)
        );

        const querySnapshot = await getDocs(q);
        // this means that already exist, so we will delete this
        if (querySnapshot.size > 0) {
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                // console.log("Document successfully deleted!");
            });
        } else {
            // if not exist, then we are adding it to db, to make it favorite
            const obj = {
                ...dialogData,
                email: userData?.user?.email
            };
            await addDoc(collection(db, "news"), obj);
            // console.log("New document added!");
        }
        // updating local state
        dispatch(TOGGLESAVEDNEWS(dialogData));
        dispatch(TOGGLEDIALOG(null))
        if (favorite) {
            toast.success('Unsaved')
        } else {
            toast.success('Saved')
        }
    };

    // func to close the dialog box
    const closeDialog = () => {
        dispatch(TOGGLEDIALOG(null));
    };

    // check if favorite or not to apply the CSS accordingly
    useEffect(() => {
        const index = savedNews.findIndex((item) => item?.title === dialogData?.title) || [];
        if (index === -1) {
            // Object not found in savedNews
            setFavorite(false)
        } else {
            // Object found in savedNews
            setFavorite(true)
        }
    }, [dialogData])

    const cancelButtonRef = useRef(null);

    return (
        <div>
            <Transition.Root show={openDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={closeDialog}>
                    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/30 bg-opacity-25">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 border-b-2 pb-2">
                                        {dialogData?.title}
                                    </Dialog.Title>

                                    <div className="flex flex-col justify-center items-start border-b-2">
                                        <span className="text-xs md:text-sm my-2 italic">{dialogData?.description}</span>
                                        <span className="text-xs md:text-sm my-2 italic">{dialogData?.content}</span>
                                        <span className="text-xs md:text-sm my-2 italic">
                                            Source: <a href={dialogData?.url} target="_blank" className="text-blue-500">{dialogData?.source?.name}</a>
                                        </span>
                                        <img src={dialogData?.urlToImage} alt="img" className="w-full h-[40vw] lg:w-6/12 lg:h-[30vw] mx-auto my-2" />
                                        <div className="flex justify-between items-center w-full text-xs md:text-sm my-2 italic">
                                            <span>{dialogData?.author}</span>
                                            <span>{moment(dialogData?.publishedAt).format('ll')}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center w-full mt-4">
                                        <span className="flex">
                                            {favorite ? 'Saved: ' : 'Save It: '}
                                            <StarIcon
                                                onClick={handleFavorite}
                                                className={`w-6 h-6 cursor-pointer ${favorite ? 'text-yellow-500' : 'text-slate-300'}`}
                                            />
                                        </span>
                                        <span onClick={closeDialog} className="flex cursor-pointer">
                                            <ArrowLeftIcon className="w-6 h-6" />
                                            Back
                                        </span>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default NewsContent;