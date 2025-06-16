import Post from "../../components/shared/ui/Post";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useSearchParams } from "react-router";
import { uploadToCloudinary } from "../../utils/cloudinary";
import Modal from "../../components/shared/ui/Modal";
import Button from "../../components/shared/ui/Button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function Home() {
  const createModal = useRef();
  const { userData, userToken } = useContext(AuthContext);
  const userId = userData.id;
  const [searchParams] = useSearchParams();
  const create = searchParams.get("create");
  const postId = searchParams.get("postId");

  const [postsWithUsers, setPostsWithUsers] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
    const getPostsAndUsers = async () => {
      const response = await api.get(
        `/posts?_expand=user`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setPostsWithUsers(response.data.reverse());
    };
    const getUserLikes = async () => {
      const { data } = await api.get(
        `/users/${userId}?_embed=likes`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setUserLikes(data);
    };
    const getSinglePost = async () => {
      const { data } = await api.get(
        `/posts/${postId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setCaption(data.caption);
      setPreview(data.imageUrl);
      setImage(data.imageUrl);
    };
    try {
      if (postId) {
        getSinglePost();
      }
      if (create === "new" || create === "edit")
        createModal.current?.showModal();
      setIsLoading(true);
      getPostsAndUsers();
      getUserLikes();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [userId, userToken, create, navigate, postId]);

  const handleIncreaseComments = (postId) => {
    setPostsWithUsers((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, commentsCount: post.commentsCount + 1 };
        }
        return post;
      })
    );
  };
  const handleDecreaseComments = (postId) => {
    setPostsWithUsers((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: Math.max(post.commentsCount - 1, 0),
          };
        }
        return post;
      })
    );
  };
  const handleIncreaseLikes = (postId) => {
    setPostsWithUsers((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, likesCount: post.likesCount + 1 };
        }
        return post;
      })
    );
    setUserLikes((prevLikes) => ({
      ...prevLikes,
      likes: [...prevLikes.likes, { postId }],
    }));
  };
  const handleDecreaseLikes = (postId) => {
    setPostsWithUsers((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, likesCount: Math.max(post.likesCount - 1, 0) };
        }
        return post;
      })
    );
    setUserLikes((prevLikes) => ({
      ...prevLikes,
      likes: prevLikes.likes.filter((like) => like.postId !== postId),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChanges = (e) => {
    setCaption(e.target.value);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoadingPost(true);
    try {
      const imageUrl = await uploadToCloudinary(
        image,
        import.meta.env.VITE_PRESET_POSTS_NAME
      );
      await api.post(
        `/posts`,
        {
          userId: JSON.parse(atob(userToken.split(".")[1]))?.sub,
          imageUrl,
          caption,
          likesCount: 0,
          commentsCount: 0,
          createdAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCaption("");
      setImage(null);
      setPreview("");
      navigate("/");
      toast.success("Post added successfully");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  const deletePost = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await api.delete(
          `/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setPostsWithUsers((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const editPost = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoadingPost(true);
    try {
      const imageUrl = await uploadToCloudinary(image, import.meta.env.VITE_PRESET_POSTS_NAME);
      await api.patch(
        `/posts/${postId}`,
        {
          imageUrl,
          caption,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCaption("");
      setImage(null);
      setPreview("");
      navigate("/");
      toast.success("Post edited successfully");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleCreatePostButton = () => {
    navigate("/?create=new");
  };

  // Loading state
  if (isLoading || postsWithUsers === null) {
    return <div className="text-center">Loading...</div>;
  }

  // Empty state
  if (postsWithUsers.length === 0) {
    return (
      <>
        {create === "new" && (
          <>
            <Modal
              ref={createModal}
              onClose={() => navigate("/")}
              action={"new"}
              handleCreatePost={handleCreatePost}
              handleImageChange={handleImageChange}
              handleInputChanges={handleInputChanges}
              preview={preview}
              caption={caption}
              loading={loadingPost}
            />
          </>
        )}
        <main className=" flex flex-col items-center justify-center text-center w-full h-full ">
          <div className="text-center">No posts available yet!</div>
          <div className="w-[25%]">
            <Button
              onClick={handleCreatePostButton}
              text="Create your first Post"
              type="button"
            >
              Create your first Post
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <div className="text-center sm:w-[60%] mx-auto">
      {create === "new" && (
        <>
          <Modal
            ref={createModal}
            onClose={() => navigate("/")}
            action={"new"}
            handleCreatePost={handleCreatePost}
            handleImageChange={handleImageChange}
            handleInputChanges={handleInputChanges}
            preview={preview}
            caption={caption}
            loading={loadingPost}
          />
        </>
      )}
      {create === "edit" && (
        <>
          <Modal
            ref={createModal}
            action={"edit"}
            onClose={() => navigate("/")}
            handleCreatePost={handleCreatePost}
            handleEditPost={editPost}
            handleImageChange={handleImageChange}
            handleInputChanges={handleInputChanges}
            preview={preview}
            caption={caption}
            loading={loadingPost}
          />
        </>
      )}
      <h1 className="text-3xl font-bold underline my-5">What's new!</h1>
      {postsWithUsers.map((post) => {
        if (!post.user) return null;
        return (
          <Post
            key={post.id}
            deletePost={deletePost}
            post={post}
            isLiked={userLikes.likes?.some((like) => like.postId === post.id)}
            handleIncreaseComments={handleIncreaseComments}
            handleDecreaseComments={handleDecreaseComments}
            handleIncreaseLikes={handleIncreaseLikes}
            handleDecreaseLikes={handleDecreaseLikes}
          />
        );
      })}
    </div>
  );
}
