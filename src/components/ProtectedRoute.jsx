import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;