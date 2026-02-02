import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; 
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ContactPage from '../pages/ContactPage';
import TeamPage from '../pages/TeamPage';
import AboutPage from '../pages/AboutPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';

const PageContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Switch>
          <Route exact path="/">
            <HomePage /> 

          </Route>
          
          <Route path="/shop/:gender/:categoryName/:categoryId">
            <ShopPage />
          </Route>

          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/product/:id">
            <ProductDetailPage />
          </Route>

          <Route path="/contact">
            <ContactPage /> 
          </Route>

          <Route path="/team">             
            <TeamPage />
          </Route>

          <Route path="/about">
           <AboutPage />
          </Route>

          <Route path="/signup">           
            <SignUpPage />
          </Route>

          <Route path="/login">           
            <LoginPage />
          </Route>
        </Switch>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageContent;