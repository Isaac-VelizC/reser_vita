import AppLogo from '@/components/app-logo';
import { cn } from '@/lib/utils';
import React from 'react'


interface FooterLinkSection {
  title: string;
  links: { label: string; href: string }[];
}

const sections: FooterLinkSection[] = [
  {
    title: "Producto",
    links: [
      { label: "Características", href: "#" },
      { label: "Precios", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nosotros", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

function AppFooterLayout() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-14 px-6 border-t border-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* LOGO + DESCRIPCIÓN */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <AppLogo />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sistema de gestión de reservas para salones de belleza y spas.
            </p>
          </div>

          {/* SECCIONES DE ENLACES */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "transition-colors hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVISOR + COPYRIGHT */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AISAKVELIZ. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default AppFooterLayout
