import React from "react";
import {Card, CardBody} from 'reactstrap';
const UserProfile = ({ userProfile }) => {
    console.log("inside user profile", userProfile)
  return (
      <Card>
        <CardBody>
        <p><strong>User Name: {userProfile.displayName}</strong></p>
            <p>Full Name: {userProfile.firstName} {userProfile.lastName}</p>
        <p>User Type: {userProfile.userTypeId}</p>
        </CardBody>
      </Card>
  );
};

export default UserProfile;
