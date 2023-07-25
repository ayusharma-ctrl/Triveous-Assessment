import React, { useEffect, Fragment } from 'react'
import { Switch, Tab } from '@headlessui/react'
import Tabs from './Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLEVIEW } from '../store/reducers/NewsDataReducer'
import Dialog from './Dialog'

const Dashboard = () => {
    // get news data from redux state
    const preferenceData = useSelector((state) => state.news)
    const enabled = preferenceData.displayGrid

    const dispatch = useDispatch()
    // func to update display grid state, how user wants to see the tiles/news on screen
    const handleGrid = () => {
        dispatch(TOGGLEVIEW())
    }

    return (
        <div>
            <div className='flex justify-end items-center mr-4 gap-2'>
                <span>
                    Grid View:
                </span>
                <Switch
                    checked={enabled}
                    onChange={handleGrid}
                    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
            </div>
            <Tabs />
            <Dialog />
        </div>
    )
}

export default Dashboard