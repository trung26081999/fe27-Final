import { AdminLayout } from "layout/admin-layout/AdminLayout";
import { useLocation } from "react-router-dom";
import { ProductManagement } from "./components";
import { UserManagement } from "./components/users/User";

function AdminPage() {
  const location = useLocation();
  console.log(location.pathname)
  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
        return <h1>HOME</h1>;
      case "/admin/category":
        return <UserManagement/>;
      case "/admin/order":
        return <h1>Order</h1>;
      case "/admin/product":
        return <ProductManagement />;
      default:
        return <h1>HOME</h1>;
    }
  };

  return <AdminLayout>{renderContent()}</AdminLayout>;
}

export default AdminPage;
