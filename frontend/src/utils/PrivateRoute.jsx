// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const getToken = () => localStorage.getItem('token');

// const AuthWrapper = ({ component: Component, ...rest }) => {
//   const isAuthenticated = getToken() !== null;

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

// export default AuthWrapper;