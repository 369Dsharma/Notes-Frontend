import TagInput from '@/components/Input/TagInput';
import axiosInstance from '@/utils/axiosInstance';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({noteData,getAllNotes, type, onClose , showToastMessage}) => {
    const [title , setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);

    const [error,  setError] = useState(null);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
            title,
            content,
            tags,
            });

            if (response.data && response.data.note) {
            showToastMessage("Note Added Successfully");
            getAllNotes();
            onClose();
            }
        } catch (error) {
            if (
            error.response &&
            error.response.data &&
            error.response.data.message
            ) {
            setError(error.response.data.message);
            }
        }
    };


    // Update Note

    const editNote = async()=>{
        const noteId = noteData._id;
        try {
        const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
        });

        if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
        }
        } catch (error) {
        if (
        error.response &&
        error.response.data &&
        error.response.data.message
        ) {
        setError(error.response.data.message);
        }
        }
    };

    const handleAddNote = ()=>{
        if(!title){
            setError("Please enter the title");
            return;
        }

        if(!content)
        {
            setError("Please enter the content");
            return;
        }

        setError("");

        if(type === 'edit'){
            editNote()
        }
        else{
            addNewNote()
        }
    };

  return (
    <div className='relative'>
        <button className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center absolute top-2 sm:top-3 right-2 sm:right-3 hover:bg-slate-400 ' onClick={onClose}>
            <MdClose className='text-lg sm:text-xl text-blue-600' />
        </button>

        <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
            type="text"
            className="text-lg sm:text-2xl text-slate-950 outline-none"
            placeholder="Go To Gym At 5"
            value={title}
            onChange = {({target})=> setTitle(target.value)}
        />
        </div>

        <div className="flex flex-col gap-2 mt-3 sm:mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Content"
            rows={8}
            value={content}
            onChange = {({target})=> setContent(target.value)}
        />
        </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>

            <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-red-500 text-sm sm:text-xs pt-3 sm:pt-4'>{error}</p>}

        <button className='btn-primary font-medium mt-4 sm:mt-5 p-2 sm:p-3' onClick={handleAddNote}>
            {type === "edit" ? "UPDATE"  : "ADD"}
        </button>
    </div>
  );
}

export default AddEditNotes
