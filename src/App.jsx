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
import ProtectedRoute from "./components/ProtectedRoute";

import { AppContext, AppContextProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const appData = {
    appName: "ShareSpace",
    tagline: "A community resource sharing platform",
  };

  return (
    <AuthProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            {/* Public website */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/resources/:id" element={<ResourceDetails />} />
              <Route element={<ProtectedRoute allowedRole="borrower" />}>
                <Route
                  path="/borrower/dashboard"
                  element={<BorrowerDashboard />}
                />
              </Route>

              <Route element={<ProtectedRoute allowedRole="owner" />}>
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/owner/resources" element={<ManageResources />} />
              </Route>
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
    </AuthProvider>
  );
}

export default App;
