import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Carousel from './components/Carousel';
import PropertyList from './components/PropertyList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={PropertyList} />
            <Route path="/property/:id" component={Carousel} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
