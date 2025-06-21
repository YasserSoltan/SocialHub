import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api/axios";

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const response = await api.get(`/users/${userId}?_embed=posts`);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <section className="w-[75%] mx-auto">
      <section className=" flex">
        <div className="avatar">
          <div className="w-10 rounded-full ">
            <img src={user.avatar} alt="Profile img" />
          </div>
        </div>
        <div>
          <h3 className="inline-block mx-1 font-medium">{user.username}</h3>
          <h3 className="inline-block mx-1 font-medium">{user.}</h3>
        </div>
      </section>
    </section>
  );
}
