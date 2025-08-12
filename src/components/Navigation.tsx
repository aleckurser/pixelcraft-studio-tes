import { Button } from "@/components/ui/button";
import { Camera, Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    setLoadingText("Signing you in...");
    setTimeout(() => {
      setLoadingText("");
      router.push("/login");
    }, 800);
  };

  const handleGetStarted = () => {
    setTimeout(() => {
      router.push("/editor");
    }, 800);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "backdrop-blur-md bg-white/60 dark:bg-black/60"
          : "bg-gradient-to-r from-purple-500/60 to-pink-500/60"
      }`}
    >
      {/* Gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] animated-border" />

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AIEdit</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">About</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={handleSignIn}>
              <User className="w-4 h-4 mr-2" /> Sign In
            </Button>
            <Button className="ai-glow" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Loading text */}
        {loadingText && (
          <div className="text-sm text-center mt-2 text-foreground/80 animate-fadeIn">
            {loadingText}
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 pt-4 border-t border-border/20 flex flex-col gap-4">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">About</a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border/20">
              <Button variant="ghost" onClick={handleSignIn}>
                <User className="w-4 h-4 mr-2" /> Sign In
              </Button>
              <Button className="ai-glow" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: white;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        .animated-border {
          background: linear-gradient(
            90deg,
            #ff00cc,
            #3333ff,
            #ffcc00,
            #ff00cc
          );
          background-size: 300% 300%;
          animation: gradientMove 8s ease infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
