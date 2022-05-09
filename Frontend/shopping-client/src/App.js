import { Routes, Route } from 'react-router-dom';
import { Cart } from './routes/cart';
import { Complete } from './routes/complete';
import { Products } from './routes/products';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="cart" element={<Cart />} />
      <Route path="complete" element={<Complete />} />
    </Routes>
  );
}
