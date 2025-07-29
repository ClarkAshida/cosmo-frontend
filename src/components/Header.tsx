import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HeaderProps {
  pageTitle: string;
  onMenuClick?: () => void;
}

const Header = ({ pageTitle, onMenuClick }: HeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simulação de usuário logado - você pode substituir por um contexto real depois
  const [user, setUser] = useState({
    isLoggedIn: true,
    name: "Flávio Severiano",
    type: "Administrador",
  });

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: "", type: "" });
    setIsUserMenuOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-border shadow-soft h-16 flex items-center justify-between px-6">
      {/* Left side - Mobile menu button and Page Title */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      </div>

      {/* User Menu */}
      <div className="relative" ref={dropdownRef}>
        {user.isLoggedIn ? (
          <div>
            <Button
              variant="ghost"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">{user.type}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 z-50">
                <Card className="border shadow-medium">
                  <CardContent className="p-2">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ) : (
          <Button className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Login</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
