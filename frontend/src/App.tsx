import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CategorySelector } from './components/CategorySelector'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ProductsPage } from './pages/products'
import { ProductDetailPage } from './pages/products/[id]'
import { CheckoutPage } from './pages/checkout'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <CategorySelector />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
