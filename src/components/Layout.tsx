import type { ReactNode } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Páginas onde não queremos mostrar o layout completo (como login)
  const noLayoutPages = ["/login"];
  const shouldShowLayout = !noLayoutPages.includes(location.pathname);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header pageTitle={pageTitle} onMenuClick={handleMenuClick} />

        <main className="flex-1 p-6">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
