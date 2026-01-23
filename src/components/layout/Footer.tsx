import React from "react";
import Link from "next/link";

const footerLinks = {
  product: [
    { href: "/launches", label: "Browse Launches" },
    { href: "/developers", label: "Find Developers" },
    { href: "/how-it-works", label: "How It Works" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-lg">
            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-sm text-text-primary mb-3">
                Product
              </h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-sm text-text-primary mb-3">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-sm text-text-primary mb-3">
                Legal
              </h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-border">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Propel Vibes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
