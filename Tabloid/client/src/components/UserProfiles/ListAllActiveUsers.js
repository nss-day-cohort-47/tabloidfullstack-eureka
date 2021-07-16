import React, { useEffect, useState } from "react";
import UserProfile from './UserProfile';
import { GetAllActiveUsers } from "../../modules/UserProfileManager";
import '../../index.css'
const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    GetAllActiveUsers().then(users => setUsers(users));
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log("state users", users)
  return (
      <div className="row justify-content-center DELETELATER-User-List">
        {users.map((user) => (
          <UserProfile userProfile={user} key={user.id} />
        ))}
    </div>
  );
};

export default UserList;
