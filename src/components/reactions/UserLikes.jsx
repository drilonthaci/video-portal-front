const UserLikes = ({ videoPost, onUnlike }) => (
    <li className="py-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{videoPost.videoPostName}</span>
        <button
          className="text-sm text-red-500 underline cursor-pointer"
          onClick={() => onUnlike(videoPost.videoPostId)}
        >
          Unlike
        </button>
      </div>
    </li>
  );
  export default UserLikes;

  