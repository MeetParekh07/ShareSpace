import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Explore from "./pages/Explore";
import ResourceDetails from "./pages/ResourceDetails";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ManageResources from "./pages/ManageResources";

import { AppContext, AppContextProvider } from "./context/AppContext";

function App() {
  const appData = {
    appName: "ShareSpace",
    tagline: "A community resource sharing platform",
  };

  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Public website */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/resources/:id" element={<ResourceDetails />} />
            <Route path="/borrower/dashboard" element={<BorrowerDashboard />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/resources" element={<ManageResources />} />
          </Route>

          {/* Authentication pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
