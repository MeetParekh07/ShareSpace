
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRole }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  if (allowedRole && profile.role !== allowedRole) {
    return (
      <Navigate
        to={profile.role === "owner" ? "/owner/dashboard" : "/borrower/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
