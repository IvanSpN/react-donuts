import { Routes, Route } from 'react-router-dom';
import '../src/styles/index.scss';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';

import Donut from './pages/Donut';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="items/:id" element={<Donut />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
