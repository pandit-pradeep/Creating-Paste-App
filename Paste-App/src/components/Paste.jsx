import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom'
import { Copy, Pencil, Trash2, Eye, Share2 } from "lucide-react";


const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title && paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }


  const handleShare = (paste) => {
    const url = `${window.location.origin}/pastes/${paste._id}`;

    navigator.clipboard.writeText(url);
    toast.success("Link copied! Share karo 🚀");
  };


  return (
    <div>

      <div className='flex flex-row justify-center'>
        <input
          className='flex flex-row p-2 rounded-2xl border border-black-500 min-w-[50%] mt-5 outline-none shadow-md justify-center place-content-center '
          type="Search"
          placeholder='Search Here'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border   mt-5' key={paste?._id}>
                  <div className='font-extrabold'>
                    {paste.title}
                  </div>
                  <div className='font-light'>
                    {paste.content}
                  </div>
                  
                  <div className='flex flex-row gap-10 place-content-evenly justify-end  '>

                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      <button>
                        <Pencil className="w-5 h-5 cursor-pointer" />
                      </button>
                    </NavLink>

                    <NavLink to={`/pastes/${paste?._id}`}>
                      <button>
                        <Eye className="w-5 h-5 cursor-pointer" />
                      </button>
                    </NavLink>


                    <button onClick={() => handleDelete(paste?._id)}>
                      <Trash2 className="w-5 h-5 cursor-pointer" />
                    </button>


                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to clipboard")
                    }}
                    >
                      <Copy className="w-5 h-5 cursor-pointer" />
                    </button>
                    <button onClick={() => handleShare(paste)}>
                      <Share2 className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                  <p className="text-sm text-black-500  mt-5 font-extrabold text-right pr-10  ">
                    {new Date(paste.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div >
              )

            })

        }
      </div >

    </div >
  )
}

export default Paste
