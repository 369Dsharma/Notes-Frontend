import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = ()=>{
    if(inputValue.trim() !== ""){
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
        addNewTag();
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag)=> tag !== tagToRemove));
  }
  return (
    <div>

        {tags?.length > 0 && 
        (
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap mt-2">
                {tags.map((tag, index)=>(
                    <span key={index} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-900 bg-slate-100 px-2 sm:px-3 py-1 rounded">
                        # {tag}
                        <button onClick={()=> {handleRemoveTag(tag)}}>
                            <MdClose className="text-sm sm:text-base" />
                        </button>
                    </span>
                ))}
            </div>
        )}

      <div className="flex items-center gap-2 sm:gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-2 sm:px-3 py-2 rounded outline-none flex-1"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 transition-colors duration-200"
            onClick={() => {
                addNewTag();
            }}
        >
          <MdAdd className="text-xl sm:text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
