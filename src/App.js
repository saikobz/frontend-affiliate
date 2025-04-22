import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Register from './pages/Register';
import KeycloakCallback from './pages/KeycloakCallback';
import PackageList from './pages/PackageList';
import PackageDetail from './pages/PackageDetail';
import Dashboard from "./pages/Dashboard";
import RefLinkHandler from "./pages/RefLinkHandler";
import AuthCallback from "./pages/AuthCallback";
import AddWebsite from './pages/AddWebsite';
import WebsitesList from './pages/WebsitesList';
import Navbar from './components/Navbar';
import EditWebsite from './pages/EditWebsite';
import RedirectWithRef from "./pages/RedirectWithRef";
import LoginRequired from './pages/LoginRequired';


function App() {
  return (
    <Router><Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/detail/:slug" element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/callback" element={<KeycloakCallback />} />
        <Route path="/packages" element={<PackageList />} />
        <Route path="/packages/:slug" element={<PackageDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/r/:refId" element={<RefLinkHandler />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/add-website" element={<AddWebsite />} />
        <Route path="/websites" element={<WebsitesList />} />
        <Route path="/edit-website/:id" element={<EditWebsite />} />
        <Route path="/r/:ref" element={<RedirectWithRef />} />
        <Route path="/login-required" element={<LoginRequired />} />

        {/* เพิ่มหน้าอื่นๆ ตามต้องการ */}
      </Routes>
    </Router>
  );
}

export default App;