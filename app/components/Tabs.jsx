import React, { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import Popular from './news/Popular'
import Favorite from './news/Favorite'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Tabs = () => {

    return (
        <>
            <div className="w-[98vw] mx-0 sm:mx-4 px-2 py-8 sm:px-0">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        <Tab as={Fragment} className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }>
                            <button>Popular</button>
                        </Tab>
                        <Tab as={Fragment} className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }>
                            <button>Favorite</button>
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                        )}>
                            <Popular />
                        </Tab.Panel>
                        <Tab.Panel className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                        )}>
                            <Favorite />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    )
}

export default Tabs