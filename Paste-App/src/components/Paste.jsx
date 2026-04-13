import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom'


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

      <input
        className='flex p-2 rounded-2xl min-w-[600px] mt-5 justify-center place-content-center '
        type="Search"
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border mt-5' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>


                    <button>
                      <NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                    </button>


                    <button>
                      <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
                    </button>


                    <button onClick={() => handleDelete(paste?._id)}>Delete</button>


                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to clipboard")
                    }}
                    >
                      Copy
                    </button>
                    <button onClick={() => handleShare(paste)}>Share</button>
                  </div>
                </div >
              )

            })

        }
      </div >

    </div >
  )
}

export default Paste
