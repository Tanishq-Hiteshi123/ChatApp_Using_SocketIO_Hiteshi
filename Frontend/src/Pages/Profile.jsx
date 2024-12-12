import React from "react";
import ProfileSideBar from "../Components/ProfileSideBar";
import GroupTable from "../Components/GroupTable";
import Navbar from "../Components/Navbar";

const Profile = () => {

    let allGroups = [
        {
             Name : "Tanna's Area",
             GroupMembers : ["Tanishq" , "Second" , "NewUser"],
             createdAt : "12thNov , 2024"
        },
        {
             Name : "Tanna's Area",
             GroupMembers : ["Tanishq" , "Second" , "NewUser"],
             createdAt : "12thNov , 2024"
        }
    ]
  return (
      <div>

      <Navbar />
    <div className="w-full h-screen bg-gray-300 flex items-start justify-start gap-12 ">
      <ProfileSideBar />
      <div className="flex items-center justify-center gap-4 flex-col">
        <div className="h-[50vh] w-[70vw] bg-white shadow-xl">
            <h1 className="text-2xl p-3">About</h1>
           
           <div className="details flex flex-col gap-5 mt-5">

            <div className=" flex items-center justify-start px-3">
            <h4 className=" font-bold w-[20%]">Full Name</h4>
            <p>Tanishq Yadav</p>
            </div>
            <div className=" flex items-center justify-start px-3">
            <h4 className=" font-bold w-[20%]">Email</h4>
            <p>tanishq.yadav@hiteshi.com</p>
            </div>
            <div className=" flex items-center justify-start px-3">
            <h4 className=" font-bold w-[20%]">Phone</h4>
            <p>98xxxxxx67</p>
            </div>
            <div className=" flex items-center justify-start px-3">
            <h4 className=" font-bold w-[20%]">Address</h4>
            <p>NA</p>
            </div>
           </div>
        </div>
        <div className="h-[50vh] w-[70vw] bg-white shadow-xl">
            <h1 className="text-2xl p-3">Group(s) Created</h1>
            <GroupTable groupDetails={allGroups} />
        </div>
      </div>
    </div>
      </div>
  );
};

export default Profile;
