import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';
import PageContent from './layout/PageContent';
import { verifyTokenAction } from './store/actions/authActions';
import './App.css';

// App içeriği (token kontrolü burada)
function AppContent() {
  const dispatch = useDispatch();
  
  // Uygulama başlarken token kontrolü
  useEffect(() => {
    // Token var mı kontrol et
    const token = localStorage.getItem('token');
    
    if (token) {
      // Token varsa doğrula
      dispatch(verifyTokenAction());
    }
  }, [dispatch]);
  
  return (
    <Router>
      <PageContent />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

// Ana App component
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;