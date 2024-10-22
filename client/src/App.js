import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/collection" component={Collection} />
        <Route path="/item/:id" component={ItemDetail} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
