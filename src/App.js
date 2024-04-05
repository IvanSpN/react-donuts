import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../src/styles/index.scss';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { SearchContext } from '.';

function App() {
  // стейт для управляемого инпута
  const [searchValue, setSearchValue] = React.useState('');

  // значения передаваемые в контекст
  const value = {
    searchValue,
    setSearchValue,
  };

  return (
    <SearchContext.Provider value={value}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
