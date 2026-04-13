// import React from 'react'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addToPastes, updateToPastes} from "../redux/pasteSlice"

const ViewPaste = () => {

  const {id} = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id)[0];



  return (
   <div>
      <div className='flex flex-row gap-7 justify-center mt-4 place-content-between'>
        <input
          className='p-2 rounded-2xl m-3  w-[65%] pl-5 '
          type="text"
          placeholder='Enter title here'
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />


        {/* <button
          onClick={createPaste}
          className='p-2 rounded-2xl m-3 '>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button> */}
      </div>

      <div className='flex flex-row justify-center mt-8'>
        <textarea
          className='rounded-2xl mt-4 min-w-[600px] p-4'
          value={paste.content}
          disabled
          placeholder='Enter Content Here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
