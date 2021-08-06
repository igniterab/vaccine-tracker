import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Result from './components/result';

function App() {

    return (
        <BrowserRouter>

            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/result" exact component={Result} />
            </Switch>


        </BrowserRouter>
    )
}

export default App;
