const CommentsSection = ({ videoPost }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold font-roboto mb-2">Comments</h3>
      {videoPost && videoPost.comments && (
        videoPost.comments.map((comment) => (
          <div key={comment.id} className="border-b pb-2">
            <p className="text-sm text-gray-800">
              <strong>{comment.userEmail.split('@')[0]}:</strong> {comment.commentText}
            </p>
            <p className="text-xs text-gray-600">
              Posted on {new Date(comment.commentedAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsSection;