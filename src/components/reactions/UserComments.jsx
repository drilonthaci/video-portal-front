const UserComments = ({ comment }) => (
    <li className="py-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{comment.commentText}</span>
        <span className="text-sm">{comment.videoPostName}</span>
      </div>
    </li>
  );
  export default UserComments;
