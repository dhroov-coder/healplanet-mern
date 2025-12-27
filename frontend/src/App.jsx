import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Category from "./pages/Category";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Enquiries from "./admin/Enquiries";

// Layout
import AdminLayout from "./admin/AdminLayout";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";

  return (
    <>
      {/* PUBLIC WEBSITE */}
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products/:category" element={<CategoryProducts />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN LAYOUT ROUTE GROUP */}
        <Route path="/admin" element={<AdminLayout />}>
          
          {/* Content goes INSIDE AdminLayout */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="enquiries" element={<Enquiries />} />

        </Route>
      </Routes>

      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;
