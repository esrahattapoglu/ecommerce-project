import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; 
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';

const PageContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Switch>
          <Route exact path="/">
            <HomePage /> 
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
        </Switch>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageContent;