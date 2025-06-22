import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CategorySelector } from './components/CategorySelector.ro'
import Header from './components/Header'
import Footer from './components/Footer'
import { ProductsPage, ProductDetailPage } from './pages/products'
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
            <Route path="/" element={<ProductsPage />} />
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
