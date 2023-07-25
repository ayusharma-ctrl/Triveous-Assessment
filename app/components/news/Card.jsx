import { TOGGLEDIALOG } from '@/app/store/reducers/NewsDataReducer'
import moment from 'moment/moment'
import React from 'react'
import { useDispatch } from 'react-redux'

const Card = ({ data, enabled }) => {
  const dispatch = useDispatch()
  // func to update currently open dialog data & update it's state like open/close
  const handleDialog = () => {
    dispatch(TOGGLEDIALOG(data))
  }

  return (
    <div onClick={handleDialog} className={` ${enabled ? 'w-[150px] sm:w-[280px] md:w-[230px] lg:w-[300px] 2xl:w-[350px]' : 'w-full md:w-[400px] lg:w-[500px] xl:w-[600px]'} flex flex-col items-start justify-start rounded-2xl shadow-lg mx-2 my-2 bg-slate-200 p-2 card`}>
      <span className='text-xs md:text-sm my-2 italic'>{data?.title}</span>
      <div className='image-container'>
        <img src={data?.urlToImage} alt='img' className='w-full h-2/12' />
      </div>
      <div className='flex flex-wrap justify-between items-center w-full text-xs md:text-sm my-2'>
        <span>{data?.author}</span>
        <span>{moment(data?.publishedAt).format('ll')}</span>
      </div>
      <h1 className='text-xs text-center md:text-sm my-2 w-full italic'>Open, Read, Save</h1>
    </div>
  )
}

export default Card