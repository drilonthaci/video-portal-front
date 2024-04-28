import React from "react";

const VideoPostItem = ({ videoPost, maxLength, onDelete }) => {
    return (
        <tr>
            <td className="border px-2 py-2">{videoPost.title}</td>
            <td className="border px-2 py-2">{videoPost.shortDescription.substring(0, maxLength)}</td>
            <td className="border px-2 py-2">
                <img src={videoPost.imageUrl} alt={videoPost.title} style={{ width: "100px", height: "auto" }} />
            </td>
            <td className="border px-2 py-2">
                <iframe title={videoPost.title} width="320" height="180" src={videoPost.videoUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </td>
            <td className="border px-2 py-2">{videoPost.publishedDate}</td>
            <td className="border px-2 py-2">{videoPost.publisher}</td>
            <td className="border px-2 py-2">
                {videoPost.categories.map(category => (
                    <span key={category.id}>{category.name}, </span>
                ))}
            </td>
            <td className="border px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => onDelete(videoPost.id)}>Delete</button>
            </td>
        </tr>
    );
}

export default VideoPostItem;
