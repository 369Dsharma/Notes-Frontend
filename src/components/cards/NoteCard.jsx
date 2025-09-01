import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md'

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className='border rounded p-3 sm:p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
       
        <div className='flex items-center justify-between'>
            <div className='flex-1 min-w-0'>
                <h6 className='text-sm sm:text-sm font-bold truncate'>{title}</h6>
                <span className='text-xs text-slate-500'>{date}</span>
            </div>

            <MdOutlinePushPin className={`icon-btn flex-shrink-0 ${isPinned ? 'text-fuchsia-900' : 'text-gray-900 hover:text-blue-400'}`} onClick={onPinNote} />
        </div>

        <p className='text-xs text-slate-600 mt-2 line-clamp-3'>{content?.slice(0,60)}</p>

        <div className='flex items-center justify-between mt-2 gap-2'>
            <div className='text-xs text-slate-500 flex-1 min-w-0 overflow-hidden'>
                <span className='truncate block'>{tags.map((item)=> `#${item}`).join(' ')}</span>
            </div>

            <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>

                <MdCreate 
                    className='icon-btn hover:text-green-600'
                    onClick={onEdit}
                />

                <MdDelete 
                    className='icon-btn hover:text-red-500'
                    onClick={onDelete}
                />

            </div>
        </div>
    </div>
  )
}

export default NoteCard
