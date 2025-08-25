import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Modal.css'

const Modal = ({ closeModal, onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post(
        "https://notespark-backend.onrender.com/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.data.success) {
        console.log("Note added successfully!");
        setTitle("");
        setDescription("");
        closeModal();
        
        if (onNoteAdded) {
          onNoteAdded();
        }
        
      }
    } catch (err) {
      console.error("Error adding note:", err);
      alert("Failed to add note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex justify-center items-center z-50">
      <div className="modalcard bg-white p-8 rounded-xl h-[380px] flex flex-col justify-center gap-[20px]">
        <h2 className="addnote text-xl font-bold m-4">Add Note</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="modalinput border p-2 rounded border-gray-500"
            required
            disabled={loading}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="modalinput border p-2 rounded h-24 resize-none border-gray-500"
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="bg-blue-500 cursor-pointer text-white py-2 text-[20px] rounded hover:bg-blue-600 transition h-[35px] disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="mt-4 bg-red-500 text-[20px] text-white px-4 py-2 rounded h-[35px] cursor-pointer hover:bg-red-600"
            disabled={loading}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;