import { useEffect, useState } from "react";
// import profile_image from "../../assets/test.svg";
import { BACKEND_URI } from "../../config";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${BACKEND_URI}/api/v1/user`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="flex items-center gap-[0.5rem] border border-[#ff007a] my-[1rem] mx-[0.6rem] px-[0.7rem] py-[0.5rem] rounded-[14px]">
      <img src={user.userpic} alt="" className="w-[3.5rem] rounded-[50%]" />
      <div className="flex flex-col justify-center">
        <h2 className="text-[#fff]">{user.username}</h2>
        <h4 className="text-center text-[#fff]">{user.Email}</h4>
      </div>
    </div>
  );
};

export default Profile;
