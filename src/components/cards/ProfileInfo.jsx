import { getInitials } from '@/utils/helper'
import React from 'react'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <div className='flex items-center gap-2 sm:gap-3'>
      <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 text-sm sm:text-base'>
            {getInitials(userInfo?.fullName)}
        </div>
            <div className='min-w-0'>
                <p className='text-xs sm:text-sm font-medium truncate'>{userInfo?.fullName}</p>

                <button className='text-xs sm:text-sm text-slate-700 underline hover:text-slate-900' onClick={onLogout}>
                    Logout
                </button>
            </div>
      
    </div>
  )
}

export default ProfileInfo
