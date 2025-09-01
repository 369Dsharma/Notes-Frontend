import NoteCard from "@/components/cards/NoteCard";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import moment from "moment";
import Toast from "@/components/ToastMessage/Toast";
import AddNotesImg from '../../assets/AddNotes.png'
import EmptyCard from "@/components/EmptyCard/EmptyCard";
import NoDataImg from '../../assets/NoData.png'
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg , setShowToastMsg] = useState({
    isShown : false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);

  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({isShown:true, type:"edit", data: noteDetails})
  }

  // toast open and close

  const showToastMessage = (message , type)=>{
    setShowToastMsg({
      isShown:true,
      message,
      type
    });
  };

  const handleCloseToast = ()=>{
    setShowToastMsg({
      isShown:false,
      message:"",
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes/");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.",error);
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Search a note

  const SearchNote = async(query)=>{
     try {
      const response = await axiosInstance.get("/search-notes/", {
        params : {query},
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.",error);
    }
  }

  // pin or unpin note

  const updateIsPinned = async(noteData)=>{
       const noteId = noteData._id;
        try {
        const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
            isPinned : !noteData.isPinned,
        });

        if (response.data && response.data.note) {
        showToastMessage(!noteData.isPinned ? `Note Pinned Successfully` : `Note UnPinned Successfully`);
        getAllNotes();
        }
        } catch (error) {
          console.log(error);
        }
  }

  const handleClearSearch = ()=>{
    setIsSearch(false);
    getAllNotes();
  }

useEffect(() => {
  getAllNotes();
  getUserInfo();
  return () => {};
}, []);


  return (
    <>
      <Navbar userInfo = {userInfo} SearchNote={SearchNote} handleClearSearch={handleClearSearch}/>

      <div className="container mx-auto px-3 sm:px-4">
        {allNotes.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-8">
          
          {allNotes.map((item)=>(

            <NoteCard
            key={item._id}
            title={item.title}
            date={moment(item.createdOn).format("DD MMM YYYY")}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => updateIsPinned(item)}
          />


          ))}


        </div>
        ) : (
          <EmptyCard 
            imgSrc={isSearch ? NoDataImg : AddNotesImg} 
            message={isSearch ?`Oops! No Matching Notes Found.` : `Start creating your notes! Click on the Add Icon to share your thoughts, ideas and reminders.Let's get started!`}
          />
        )
      }
      
      </div>

      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-4 sm:right-10 bottom-4 sm:bottom-10 z-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true, type : "add", data : null
          });
        }}
      >
        <MdAdd className="text-[28px] sm:text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[90vh] bg-white rounded-md mx-auto mt-8 sm:mt-14 p-3 sm:p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={()=>{
            setOpenAddEditModal({isShown: false, type: "add" , data : null});
          }}
          getAllNotes= {getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast 

          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}

       />
    </>
  );
};

export default Home;
