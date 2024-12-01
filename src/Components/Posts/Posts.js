import React, { useState, useEffect, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const {setPostDetails}=useContext(PostContext);
  const history=useHistory()

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPosts = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        };
      });
      setProducts(allPosts);  // Update the state with the fetched products
      console.log(allPosts);
    });
  }, [firebase]);  // Correct dependency array

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card"
            onClick={()=>{
              setPostDetails(product)
              history.push('/View')
            }} key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
