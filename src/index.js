// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import {FirebaseContext} from './store/Context';
// import firebase from './firebase/config'
// import Context from './firebase/config'
// import { Children } from 'react/cjs/react.production.min';
// ReactDOM.render(

// <FirebaseContext.Provider value={{firebase}}>
// <Context>
// <App />
// </Context>
// </FirebaseContext.Provider>
// ,
//  document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context'; // Corrected import
import firebase from './firebase/config';
import Context from './store/Context'; // Import from the correct path

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>  {/* Providing Firebase context */}
    <Context> {/* Wrapping Context around App */}
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

