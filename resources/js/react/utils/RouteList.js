import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';

//Components
import List from "../pages/countries/List";
import Add from "../pages/countries/Add";
import Detail from "../pages/countries/Detail";

function RouteList() {
    return (
        <Routes>
            <Route path="/" element={ <List /> }/>
            <Route path="/add" element={ <Add /> }/>
            <Route path="/detail" element={ <Detail /> }/>
        </Routes>
    );
}

export default RouteList;
