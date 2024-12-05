import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import VendorLayout from './components/vendor/VendorLayout';
import VendorDashboard from './pages/vendor/Dashboard';
import VendorProducts from './pages/vendor/Products';
import VendorOrders from './pages/vendor/Orders';
import { CartProvider } from './context/CartContext';
import { Web3Provider } from './context/Web3Context';
import { AuthProvider } from './context/AuthContext';
import { wagmiConfig } from './config/web3';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Web3Provider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  {/* Customer Routes */}
                  <Route
                    path="/"
                    element={
                      <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-grow bg-white">
                          <ProductListing />
                        </main>
                        <Footer />
                      </div>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-grow bg-white">
                          <ProductDetail />
                        </main>
                        <Footer />
                      </div>
                    }
                  />

                  {/* Vendor Routes */}
                  <Route
                    path="/vendor/*"
                    element={
                      <VendorLayout>
                        <Routes>
                          <Route path="dashboard" element={<VendorDashboard />} />
                          <Route path="products" element={<VendorProducts />} />
                          <Route path="orders" element={<VendorOrders />} />
                        </Routes>
                      </VendorLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </Web3Provider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default App;