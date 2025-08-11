import React from "react";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { user, loading } = useAuth();
  const fallbackImage = "https://i.postimg.cc/028b8BH3/lovely-pet-portrait-isolated.jpg"
  const photo = user?.photoURL || fallbackImage;


  if (loading) return <Loading />;
  if (!user)
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl font-semibold text-red-600 px-6 text-center">
        No user logged in. Please login first.
      </div>
    );

  const { creationTime, lastSignInTime } = user.metadata || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        max-w-xl mx-auto mt-16 px-8 py-10
        bg-gradient-to-br from-indigo-50 via-white to-indigo-50
        rounded-3xl shadow-xl border border-indigo-200
        sm:max-w-3xl sm:px-16 sm:py-14
      "
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="relative rounded-full ring-4 ring-indigo-300 shadow-lg overflow-hidden w-32 h-32 sm:w-40 sm:h-40">
          <img
            src={photo}
            alt="User Avatar"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>


        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 text-center tracking-wide">
          {user.name || user.displayName || "User"}
        </h2>


        <p className="text-indigo-500 font-semibold text-center text-base sm:text-lg lowercase select-text">
          @{user.username || user.email?.split("@")[0]}
        </p>


        <div
          className="
            w-full mt-10 grid grid-cols-1 gap-6
            sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8
          "
        >
          <InfoRow label="Email "  value={user.email} />
          <InfoRow label="Phone" value={user.phoneNumber || "Not Provided"} />
          <InfoRow label="Role" value={user.role || "Student"} />
          <InfoRow
            label="Account Created"
            value={creationTime ? new Date(creationTime).toLocaleString() : "N/A"}
          />
          <InfoRow
            label="Last Login"
            value={lastSignInTime ? new Date(lastSignInTime).toLocaleString() : "N/A"}
          />
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ label, value }) => (
  <div
    className="
      flex justify-between border-b border-indigo-200 pb-2
      text-base sm:text-lg font-medium text-indigo-900
    "
  >
    <span className="pr-4">{label}</span> {/* add padding-right here */}
    <span className="text-indigo-600 text-right break-words select-text">{value}</span>
  </div>
);



export default Profile;
