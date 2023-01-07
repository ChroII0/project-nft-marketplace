import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from './App';
import HomeContent from './components/HomeContent';
import MyNFT from './components/MyNFT';
import Detail from './components/Detail';
import NFTCase from './components/NFTCase';
// import MarketPlace from './components/MarketPlace';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeContent />} />
      <Route path="mynft" element={<MyNFT />} />
      <Route path="nftcase" element={<NFTCase />} />
      <Route path="detail/:itemId" element={<Detail />} />
    </Route>
  </Routes>
</BrowserRouter>
);
