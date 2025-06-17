import { useEffect } from "react";
import { useParams } from "react-router"

export default function Profile() {
  const { userId } = useParams();
  useEffect(() => {
    console.log(userId);
  }, [userId])
  return (
    <div>
      {userId}
    </div>
  )
}
