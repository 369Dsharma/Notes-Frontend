import React from 'react'

const EmptyCard = ({imgSrc, message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-10 sm:mt-20 px-4'>
        <img src={imgSrc} alt="No Notes" className='w-40 sm:w-60' />

        <p className='w-full sm:w-3/4 md:w-1/2 text-sm sm:text-base font-medium text-slate-800 text-center leading-6 sm:leading-7 mt-3 sm:mt-5'>
            {message}
        </p>
    </div>
  )
}

export default EmptyCard
