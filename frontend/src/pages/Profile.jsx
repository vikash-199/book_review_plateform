import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.token || !user?._id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Welcome, {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default Profile;
