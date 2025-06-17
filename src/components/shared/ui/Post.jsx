import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import getTimeDifference from "../../../utils/getTimeDifference";
import { useNavigate } from "react-router";
import api from "../../../api/axios";

export default function Post({
  post,
  isLiked,
  deletePost,
  handleIncreaseComments,
  handleIncreaseLikes,
  handleDecreaseLikes,
}) {
  const { id, user, imageUrl, caption, likesCount, commentsCount, createdAt } =
    post;
  const { avatar, username } = user;
  const navigate = useNavigate();
  const likesModal = useRef();
  const commentsModal = useRef();
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [IsCommentError, setIsCommentError] = useState(false);
  const [likesUsers, setLikesUsers] = useState([]);
  const [commentsUsers, setCommentsUsers] = useState([]);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const maxLength = 100;
  const needsTruncation = caption.length > maxLength;

  const { userData } = useContext(AuthContext);
  const userId = userData.id;

  const handleLike = async () => {
    if (isLikeLoading) return;
    try {
      setIsLikeLoading(true);
      if (!isLiked) {
        const [likeResponse] = await Promise.all([
          api.post("/likes", { userId, postId: id }),
          api.patch(`/posts/${id}`, {
            likesCount: likesCount + 1,
          }),
        ]);
        if (likeResponse.status === 201) {
          handleIncreaseLikes(id);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const { data: likes } = await api.get(
          `/likes?userId=${userId}&postId=${id}`
        );
        if (!likes.length) return;
        const [unlikeResponse] = await Promise.all([
          api.delete(`/likes/${likes[0].id}`),
          api.patch(`/posts/${id}`, {
            likesCount: Math.max(likesCount - 1, 0),
          }),
        ]);
        if (unlikeResponse.status === 200){
          handleDecreaseLikes(id);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLikeLoading(false);
    }
  };
  const handleAddComment = async () => {
    try {
      if (comment.trim() === "") {
        setIsCommentError(true);
        toast.error("Please enter a valid comment");
        return;
      }
      await api.post("/comments", {
        userId,
        postId: id,
        comment,
        createdAt: new Date(),
      });
      setComment("");
      await api.patch(`/posts/${id}`, {
        commentsCount: commentsCount + 1,
      });
      handleIncreaseComments(id);
      toast.success("Comment added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleLikesModal = async () => {
    likesModal.current.showModal();
    const { data: likes } = await api.get(`/likes?postId=${id}`);
    const { data: allUsers } = await api.get(`/users`);
    const usersIds = likes.map((like) => like.userId);
    const users = allUsers.filter((user) => usersIds.includes(user.id));
    setLikesUsers(users.reverse());
  };

  const handleCommentsModal = async () => {
    commentsModal.current.showModal();
    const { data: comments } = await api.get(`/comments?postId=${id}`);
    const { data: allUsers } = await api.get(`/users`);
    const usersIds = comments.map((comment) => comment.userId);
    const users = allUsers.filter((user) => usersIds.includes(user.id));
    const displayedCommtents = comments.map((comment) => {
      const user = users.find((user) => user.id === comment.userId);
      return { ...comment, user };
    });
    setCommentsUsers(displayedCommtents.reverse());
  };

  const handleEditPost = (postId) => {
    navigate(`/?create=edit&postId=${postId}`);
  };

  return (
    <article className="flex flex-col gap-2 my-6">
      {/* <div className="flex"> */}
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="avatar">
            <div className="w-11 rounded-full">
              <img src={avatar} alt="Profile img" />
            </div>
          </div>
          <h3 className="inline-block mx-1 font-medium">{username}</h3>
          <p className="text-gray-500">• {getTimeDifference(createdAt)}</p>
        </div>
        {userId === user.id && (
          <div className="dropdown dropdown-end cursor-pointer">
            <div tabIndex={0} role="button" className="m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button onClick={() => handleEditPost(id)}>Edit</button>
              </li>
              <li>
                <button onClick={() => deletePost(id)}>Delete</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* </div> */}
      <img src={imageUrl} alt="" className="rounded-md " />
      <div className="flex gap-2">
        <button disabled={isLikeLoading} onClick={() => handleLike()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </div>
      <div className="text-start font-bold text-md ">
        <button className="cursor-pointer" onClick={() => handleLikesModal()}>
          {likesCount} likes
        </button>
        <dialog ref={likesModal} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-md text-center border-b-2 border-b-gray-300 pb-4">
              Likes
            </h3>
            {likesUsers.map((user) => (
              <div
                key={user.id}
                className="mt-4 pb-4 border-b-2 border-b-gray-300 flex gap-3"
              >
                <div className="avatar">
                  <div className="w-10 rounded-full ">
                    <img src={user.avatar} alt="Profile img" />
                  </div>
                </div>
                <div>
                  <p>{user.username}</p>
                  <p className="font-light text-sm">{user.fullName}</p>
                </div>
              </div>
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="flex gap-2">
        <div className="text-start">
          <h3 className="inline-block mr-2 font-bold text-lg">{name}</h3>
          <span className={expanded ? "inline" : "line-clamp-2 inline"}>
            {expanded || !needsTruncation
              ? caption
              : `${caption.substring(0, maxLength)}...`}
          </span>
          {needsTruncation && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500 ml-1 font-medium inline"
            >
              {expanded ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </div>
      <div className="text-start text-gray-500 cursor-pointer">
        <button
          className="cursor-pointer"
          onClick={() => handleCommentsModal()}
        >
          View all {commentsCount} comments
        </button>
        <dialog ref={commentsModal} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-md text-center border-b-2 border-b-gray-300 pb-4">
              Comments
            </h3>
            {commentsUsers.map((comment) => (
              <div
                key={comment.id}
                className="mt-4 pb-4 border-b-2 border-b-gray-300 flex gap-3"
              >
                <div className="avatar">
                  <div className="w-10 rounded-full ">
                    <img src={comment.user.avatar} alt="Profile img" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">{comment.user.username}</p>
                  <p className="text-black font-bold">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="flex justify-between items-center border-b-2 border-b-gray-300">
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            IsCommentError ? "Please enter a valid comment" : "Add a comment..."
          }
          className="outline-none p-2 flex-1"
        />
        <p
          className="text-blue-800 hover:text-blue-900 cursor-pointer"
          onClick={() => handleAddComment()}
        >
          Submit
        </p>
      </div>
      <br />
    </article>
  );
}
