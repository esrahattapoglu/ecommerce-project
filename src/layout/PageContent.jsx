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
import CartPage from '../pages/CartPage'; 
import ProtectedRoute from '../components/ProtectedRoute';
import CreateOrderPage from '../pages/CreateOrderPage'; 
import OrderHistoryPage from '../pages/OrderHistoryPage';
import BlogPage from '../pages/BlogPage';
import WishlistPage from '../pages/WishlistPage'; 

const PageContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Switch>

          
          <ProtectedRoute path="/order-history" component={OrderHistoryPage} />

          <Route exact path="/">
            <HomePage /> 
          </Route>
          
          <Route path="/shop/:gender/:categoryName/:categoryId">
            <ShopPage />
          </Route>

          <Route path="/shop">
            <ShopPage />
          </Route>

          <Route path="/product/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
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

          <Route path="/blog">
            <BlogPage />
          </Route>

          
          <Route path="/wishlist">
            <WishlistPage />
          </Route>

          <Route path="/signup">           
            <SignUpPage />
          </Route>

          <Route path="/login">           
            <LoginPage />
          </Route>

          <Route path="/cart">
            <CartPage />
          </Route>

          <ProtectedRoute path="/create-order" component={CreateOrderPage} />

        </Switch>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageContent;