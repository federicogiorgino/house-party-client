import React from "react";

function UserCard(props) {
  const { firstName, lastName, username, email, bio } = props;
  return (
    <div className='container'>
      <div>
        <img
          src='https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
          alt='Placeholder'
        />
      </div>

      <div>
        <p className='p-bold'>
          {firstName} {lastName}
        </p>
      </div>

      <div>
        <p>{username}</p>
        <p>{email}</p>
      </div>

      <div>
        <p>{bio}</p>
      </div>
    </div>
  );
}

export default UserCard;
