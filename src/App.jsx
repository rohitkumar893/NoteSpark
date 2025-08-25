import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import axios from 'axios'
import { useAuth } from './context/ContextProvider'

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false)
  const[notes, setNotes] = useState([])


  useEffect(() => {
  if (!user) {
    setNotes([]);
    return;
  }

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("https://notespark-backend.onrender.com/api/note", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setNotes(data.notes);
    } catch (err) {
      console.error(err);
    }
  }

    fetchNotes();
  }, [user]);

  const closeModal = () => {
    setModalOpen(false)
  }

  const addNote = async (title, description) => {
    try {
      const res = await axios.post(
        "https://notespark-backend.onrender.com/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      console.log("Note added:", res.data)

      setNotes(prev => [...prev, res.data.note])
      closeModal()
    } catch (err) {
      console.error("Error adding note:", err)
    }
  }

    const deleteNote = async (id) => {
      try {
        console.log("Deleting note:", id, "User:", user.id);
        await axios.delete(`https://notespark-backend.onrender.com/api/note/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setNotes(prev => prev.filter(note => note._id !== id));
        console.log("Note deleted:", id);
      } catch (err) {
        console.error("Error deleting note:", err);
      }
    };

  return (
    <div className='w-full max-h-screen'>
      <Navbar />

      <div className='h-full w-full flex flex-col justify-center items-center'>
        <img src="logo.png" className='w-[280px]' />

        <div className="notes-list mt-10 w-[80%] flex flex-col gap-[30px]">
          {notes.map(note => (
            <div key={note._id} className="note-card border border-gray-400 rounded bg-gray-100">
              <h2 className="font-semibold text-[20px]">{note.title}</h2>
              <p>{note.description}</p>
              
              <div className='flex justify-end'>
                <img src="remove.png" className='h-[22px] cursor-pointer'
                onClick={() => deleteNote(note._id)} 
                />
                </div>
            </div>
            
          ))}
        </div>

        <button
          onClick={() => {
            if (user) setModalOpen(true);
            else navigate('/login');
          }}
          className='fixed bg-blue-500 cursor-pointer right-10 bottom-10 w-[50px] h-[60px] md:w-[60px] md:h-[70px] text-white font-semibold text-[35px] md:text-[40px] flex justify-center rounded-full'>
          +
        </button>

        {isModalOpen && (
          <Modal closeModal={closeModal} addNote={addNote} />
        )}
      </div>
    </div>
  )
}

export default App
