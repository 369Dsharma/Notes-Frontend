import React, { useEffect } from 'react'
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({isShown , message , type , onClose}) => {

    useEffect(()=>{
        const timeoutId = setTimeout(()=>{
            onClose();
        },3000);

        return ()=>{
            clearTimeout(timeoutId);
        };
    }, [onClose]);
  return (
  <div
    className={`absolute top-16 sm:top-20 right-3 sm:right-6 transition-all duration-400 z-50 ${
      isShown ? "opacity-100" : "opacity-0"
    }`}
  >
    <div
      className={`min-w-48 sm:min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
        type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
      } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
    >
      <div className="flex items-center gap-2 sm:gap-3 py-2 px-3 sm:px-4">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${
            type === "delete" ? "bg-red-50" : "bg-green-50"
          }`}
        >
          {type === 'delete' ? (
            <MdDeleteOutline className='text-lg sm:text-xl text-red-500' />
          ) : 
          
         ( <LuCheck className="text-lg sm:text-xl text-green-500" />)
        
        }
        </div>

        <p className="text-xs sm:text-sm text-slate-800">{message}</p>
      </div>
    </div>
  </div>
);
}

export default Toast
