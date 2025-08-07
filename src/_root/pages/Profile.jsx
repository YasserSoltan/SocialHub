import { useParams } from "react-router";
import { useUser } from "../../hooks/useUsers";
import Loader from "../../components/ui/Loader";

export default function Profile() {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useUser(userId);
  if (isLoading)
    return <Loader />;
  if (error && error.status !== 404)
    return <div>Error: {error.message} Please Try again</div>;
  if (!user || error?.status === 404) {
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
        </div>
      </section>
    </section>
  );
}
