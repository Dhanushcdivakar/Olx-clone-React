import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory(); // Use history here
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    if (!user) {
      alert("You must be logged in to upload.");
      return;
    }

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const uploadTask = firebase.storage().ref(`/image/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Monitor progress here if needed
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("File available at:", url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString()
          }).then(() => {
            alert("Product successfully uploaded!");
            // Reset form fields after successful upload
            setName('');
            setCategory('');
            setPrice('');
            setImage(null);
            history.push('/'); // Use the history object to navigate
          }).catch((error) => {
            console.error("Firestore upload failed:", error);
            alert("Error uploading product information.");
          });
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="Name"
              required
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
              required
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              name="Price"
              required
            />
            <br />
            <input
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  console.log("Selected file:", selectedFile);
                  setImage(selectedFile);
                } else {
                  alert("No file selected.");
                }
              }}
              required
            />
            <br />
            <button type="submit" className="uploadBtn">Upload and Submit</button>
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
