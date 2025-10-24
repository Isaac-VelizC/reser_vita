"use client";
import { PropsWithChildren, useEffect, useState } from 'react';
import { dashboard, login, register } from '@/routes';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import AppLogo from '@/components/app-logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';


const MenuLinks = [
  {
    name: "Características",
    link: "#features-section"
  },
  {
    name: "Testimonios",
    link: "#testimonials-section"
  },
  {
    name: "Precios",
    link: "#pricing"
  }
];

function AppHeaderLayout({ children }: PropsWithChildren) {
  const { auth } = usePage<SharedData>().props;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-background dark:via-gray-900 dark:to-gray-800 transition-colors duration-700">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/80 shadow-lg backdrop-blur-xl border-b border-pink-100/40 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <AppLogo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {MenuLinks.map((item, index) => 
              <a key={index} href={item.link} className="nav-link hover:text-primary">
                {item.name}
              </a>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {auth.user ? (
              <Button onClick={() => router.get(dashboard().url)}>Dashboard</Button>
            ) : (
              <>
                <Button onClick={() => router.get(login().url)} variant="ghost">
                  Iniciar Sesión
                </Button>
                <Button onClick={() => router.get(register().url)}>Prueba Gratis</Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-pink-100/40 dark:border-gray-800"
              >
                <div className="mt-16 flex flex-col items-center gap-6 text-center">
                  {MenuLinks.map((item, index) => 
                    <a key={index} href={item.link} className="nav-link hover:text-primary">
                      {item.name}
                    </a>
                  )}
                  <div className="mt-4 flex flex-col gap-4 w-full px-4">
                    {auth.user ? (
                      <Button onClick={() => router.get(dashboard().url)} className="w-full">
                        Dashboard
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => router.get(login().url)} variant="ghost" className="w-full">
                          Iniciar Sesión
                        </Button>
                        <Button onClick={() => router.get(register().url)} className="w-full">
                          Prueba Gratis
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="pt-24">{children}</main>
    </div>
  );
}

export default AppHeaderLayout;
