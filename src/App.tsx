import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import MainLayout from './layouts/MainLayout';

import '../src/styles/index.scss';

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart" */ './pages/Cart')
);
const Donut = React.lazy(
  () => import(/*webpackChunkName: "Donut" */ './pages/Donut')
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound" */ './pages/NotFound')
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="items/:id"
            element={
              <Suspense fallback={<div>Идёт загрузка страницы пончика...</div>}>
                <Donut />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={<div>Идёт загрузка страницы NotFound...</div>}
              >
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
