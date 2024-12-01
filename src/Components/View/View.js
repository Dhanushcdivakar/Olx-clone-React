import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails) {
      const { userId } = postDetails;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          setUserDetails(doc.data());
        });
      });
    }
  }, [postDetails, firebase]);

  return postDetails ? (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price}</p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.username}</p>
              <p>{userDetails.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p>Loading post details...</p>
  );
}

export default View;
