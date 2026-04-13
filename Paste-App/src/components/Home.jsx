import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addToPastes, updateToPastes} from "../redux/pasteSlice"

const Home = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState('');
  const [searchParama, setSearchParams] = useSearchParams();
  const pasteId = searchParama.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);



  useEffect(() => {
  console.log("Inside use effect")
  if(pasteId){
    const paste = allPaste.find((p) => p._id === pasteId)
    console.log("Page found")
    setTitle(paste.title);
    setValue(paste.content);
  }
    
  }, [pasteId])
  

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
        Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));

    }
    else {
      dispatch(addToPastes(paste));

    }

    //After creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-7 justify-center mt-4 place-content-between'>
        <input
          className='p-2 rounded-2xl m-3 outline-none border border-black-500 w-[50%] pl-5  shadow-md  '
          type="text"
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <button
          onClick={createPaste}
          className='p-2 rounded-2xl m-3 bg-gradient-to-r from-[#ff5733] to-[#33cfff] font-semibold text-white  '>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button>
      </div>

      <div className='flex flex-row justify-center mt-8'>
        <textarea
          className='rounded-2xl outline-none border border-black-500 mt-4 min-w-[64%] p-4'
          value={value}
          placeholder='Enter Content Here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home
