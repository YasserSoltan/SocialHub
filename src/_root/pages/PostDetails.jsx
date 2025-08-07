import { useParams } from "react-router";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const { data } = await api.get(
        `/posts/${postId}?_expand=user&_embed=comments`
      );
      console.log(data);
      setPost(data);
    };

    getPost();
  }, []);
  const handleCloesModal = () => {
    setPost({});
  };
  return (
    post.user && (
      <div>
        <Modal onClose={handleCloesModal} open={true}>
          <main className="flex justify-center ">
            <section>
              <img src={post.imageUrl} alt="" />
            </section>
            <section>
              <div className="flex">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={post.user.avatar} alt="Profile img" />
                  </div>
                </div>
                <h3 className="inline-block mx-1 font-medium">
                  {post.user.username}
                </h3>
                <p className="text-gray-500">• 3d</p>
              </div>
            </section>
          </main>
        </Modal>
      </div>
    )
  );
}
