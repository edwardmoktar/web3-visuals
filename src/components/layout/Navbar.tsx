import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark');

    toast({
      title: `Switched to ${newMode ? 'dark' : 'light'} mode`,
      duration: 1500,
    });
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/path', label: 'Path' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-center">
          <Link to="/" className="text-xl font-semibold hover-lift md:hidden">
            Edward M.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link text-lg">
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover-lift"
            >
              {isDark ? (
                <img src="/dark-mode.png" alt="Dark mode" className="h-8 w-8" />
              ) : (
                <img src="/light-mode.png" alt="Light mode" className="h-8 w-8" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
            >
              {isDark ? (
                <img src="/dark-mode.png" alt="Dark mode" className="h-8 w-8" />
              ) : (
                <img src="/light-mode.png" alt="Light mode" className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}