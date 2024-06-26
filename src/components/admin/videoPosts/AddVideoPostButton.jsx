import React from "react";

const AddVideoPostButton = ({ onClick }) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded mb-4" onClick={onClick}>Add Video Post</button>
    );
}

export default AddVideoPostButton;
