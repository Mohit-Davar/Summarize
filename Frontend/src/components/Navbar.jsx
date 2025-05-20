import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../constants';
import { BorderButton, FilledButton } from './ui/Button';
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarLogo, NavBody, NavItems } from './ui/ResizableNavbar';

const AuthButtons = () => (
  <div className="flex sm:flex-row flex-col gap-4 sm:p-0 px-6 py-4 w-full sm:w-auto">
    <Link to="/login">
      <BorderButton className="w-full sm:w-auto">Login</BorderButton>
    </Link>
    <Link to="/signup">
      <FilledButton className="w-full sm:w-auto">Sign Up</FilledButton>
    </Link>
  </div>
);

export default function FixedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      setIsMobileMenuOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            onItemClick={(id) => handleScrollTo(id)}
          />
          <AuthButtons />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <button
                key={`mobile-link-${idx}`}
                onClick={() => handleScrollTo(item.link)}
                className="relative flex justify-start items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 px-6 py-4 w-full font-medium text-neutral-600 dark:text-neutral-300 text-lg">
                {item.name}
              </button>
            ))}
            <AuthButtons />
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}