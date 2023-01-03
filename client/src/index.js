import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";

import App from './App';
import HomeContent from './components/HomeContent';
import MyNFT from './components/MyNFT';
import Detail from './components/Detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <App/>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeContent />} />
      <Route path="mynft" element={<MyNFT />} />
      <Route path="detail/:itemId" element={<Detail />} />
    </Route>
  </Routes>
</BrowserRouter>
);
