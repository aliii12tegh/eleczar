"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ==========================================
// DATA STRUCTURES
// ==========================================

interface SubItem {
  name: string;
  href: string;
  description?: string;
}

interface CategoryColumn {
  title: string;
  items: SubItem[];
  icon: React.ReactNode;
}

interface MegaMenuData {
  columns: CategoryColumn[];
  promoCard: {
    title: string;
    description: string;
    cta: string;
    href: string;
    badge: string;
  };
}

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

// ==========================================
// CUSTOM SVG ICONS FOR HIGH AESTHETICS
// ==========================================

const BoltIcon = () => (
  <svg className="w-6 h-6 text-[#0055FF] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 21h-1l1.5-6.5h-5.5c-.5 0-.8-.3-.9-.6-.1-.3 0-.7.3-.9l10-12h1l-1.5 6.5h5.5c.5 0 .8.3.9.6.1.3 0 .7-.3.9l-10 12z" />
  </svg>
);

const BulbIcon = () => (
  <svg className="w-5 h-5 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.32 11.32l-.707.707M12 7a5 5 0 00-5 5c0 1.637.788 3.09 2 4v2h6v-2c1.212-.91 2-2.363 2-4a5 5 0 00-5-5z" />
  </svg>
);

const SwitchIcon = () => (
  <svg className="w-5 h-5 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="14" height="20" x="5" y="2" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m-3-5h6" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`transition-transform duration-200 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Sector Custom Icons
const SectorsIcons = {
  residentiel: (
    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  tertiaire: (
    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  industriel: (
    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13l-2 2m0 0l-2-2m2 2V3M3 21h18M3 7l5-4 5 4v14H3V7zm10 4h4v10h-4V11z" />
    </svg>
  ),
  batiment: (
    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  infrastructure: (
    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.465V19a2 2 0 11-4 0v-.535c0-.854-.34-1.674-.945-2.283l-.712-.712z" />
    </svg>
  ),
};

// Services Custom Icons
const ServicesIcons = {
  devis: (
    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  livraison: (
    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h4m0 0l4-3v-3a1 1 0 00-1-1h-7m4 7v-4" />
    </svg>
  ),
  installation: (
    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  maintenance: (
    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  formations: (
    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  conseil: (
    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export default function Navbar() {
  // Navigation states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveAccordions, setMobileActiveAccordions] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // References to handle hover debouncing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle mobile drawer body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Hover triggering functions for desktop
  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms debounce helps prevent menu closing on accidental diagonal swipes
  };

  // Toggle accordions on mobile
  const toggleAccordion = (name: string) => {
    setMobileActiveAccordions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // ==========================================
  // NAVIGATION CONFIGURATION DATA
  // ==========================================

  // 1. Produits Mega-Menu structure
  const produitsData: MegaMenuData = {
    columns: [
      {
        title: "Éclairage",
        icon: <BulbIcon />,
        items: [
          { name: "Éclairage public/tout extérieur", href: "/catalogue?cat=ecl-public" },
          { name: "Éclairage intérieur (résidentiel)", href: "/catalogue?cat=ecl-interieur" },
          { name: "Éclairage industriel", href: "/catalogue?cat=ecl-industriel" },
          { name: "Éclairage intelligent (domotique)", href: "/catalogue?cat=ecl-smart" },
          { name: "Lampes & Ampoules", href: "/catalogue?cat=ecl-lampes" },
          { name: "Projecteurs", href: "/catalogue?cat=ecl-projecteurs" },
          { name: "Luminaires architecturaux", href: "/catalogue?cat=ecl-archi" },
          { name: "Néons & tubes LED", href: "/catalogue?cat=ecl-tubes" },
        ],
      },
      {
        title: "Appareillage électrique",
        icon: <SwitchIcon />,
        items: [
          { name: "Interrupteurs (tous types)", href: "/catalogue?cat=app-interrupteurs" },
          { name: "Prises (BV, industrielles, USB)", href: "/catalogue?cat=app-prises" },
          { name: "Variateurs & gradateurs", href: "/catalogue?cat=app-variateurs" },
          { name: "Boutons poussoirs", href: "/catalogue?cat=app-poussoirs" },
          { name: "Timbres & sonneries", href: "/catalogue?cat=app-sonneries" },
        ],
      },
    ],
    promoCard: {
      badge: "Services Pro",
      title: "Devis Rapide sous 4h",
      description: "Vous gérez un chantier à Meknès ou Fès ? Transmettez vos schémas unifilaires et vos listes de matériel.",
      cta: "Demander un Devis en ligne",
      href: "/services#devis",
    },
  };

  // 2. Secteurs standard dropdown
  const secteursData: DropdownItem[] = [
    {
      name: "Résidentiel",
      href: "/secteurs#residentiel",
      description: "Maisons individuelles, villas standing, appartements collectifs",
      icon: SectorsIcons.residentiel,
    },
    {
      name: "Tertiaire",
      href: "/secteurs#tertiaire",
      description: "Bureaux professionnels, commerces de détail, hôtels, restaurants",
      icon: SectorsIcons.tertiaire,
    },
    {
      name: "Industriel",
      href: "/secteurs#industriel",
      description: "Usines de production, ateliers mécaniques, entrepôts logistiques",
      icon: SectorsIcons.industriel,
    },
    {
      name: "Bâtiment",
      href: "/secteurs#batiment",
      description: "Grands projets de construction neuve, programmes de rénovation",
      icon: SectorsIcons.batiment,
    },
    {
      name: "Infrastructure",
      href: "/secteurs#infrastructure",
      description: "Réseaux d'éclairage public, voiries routières, parkings urbains",
      icon: SectorsIcons.infrastructure,
    },
  ];

  // 3. Services standard dropdown
  const servicesData: DropdownItem[] = [
    {
      name: "Devis gratuit en ligne",
      href: "/services#devis",
      description: "Réponse sur-mesure garantie sous 4 heures ouvrées",
      icon: ServicesIcons.devis,
    },
    {
      name: "Livraison Maroc",
      href: "/services#livraison",
      description: "Tarifs avantageux et délais fiables (24/48h local)",
      icon: ServicesIcons.livraison,
    },
    {
      name: "Installation & Mise en service",
      href: "/services#installation",
      description: "Assistance technique terrain pour nos équipements phares",
      icon: ServicesIcons.installation,
    },
    {
      name: "Maintenance & Après-vente",
      href: "/services#maintenance",
      description: "Contrats de maintenance et pièces détachées constructeurs",
      icon: ServicesIcons.maintenance,
    },
    {
      name: "Formations électriciens",
      href: "/services#formations",
      description: "Séminaires techniques réguliers dans nos locaux ELECZAR",
      icon: ServicesIcons.formations,
    },
    {
      name: "Conseil technique gratuit",
      href: "/services#conseil",
      description: "Ligne dédiée d'ingénieurs conseils pour vos chantiers",
      icon: ServicesIcons.conseil,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalogue?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="w-full bg-white text-[#1F2937] relative z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06),0_1px_6px_-2px_rgba(0,0,0,0.04)] select-none">
      
      {/* ==========================================
          1. B2B UTILITY TOP BAR (Desktop Only)
          ========================================== */}
      <div className="hidden lg:block w-full bg-[#1F2937] text-white border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 h-10 flex justify-between items-center text-xs font-medium tracking-wide">
          
          {/* Contact Details */}
          <div className="flex items-center space-x-6 text-gray-300">
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors duration-150">
              <PhoneIcon />
              <span>Support Pro : <strong>+212 535 000 000</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors duration-150">
              <MailIcon />
              <span>contact@eleczar.ma</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors duration-150">
              <MapPinIcon />
              <span>Zone Industrielle, Meknès</span>
            </span>
          </div>

          {/* Quick links & Status Info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-gray-300 font-semibold">Livraison Rapide 24/48h au Maroc</span>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <Link 
              href="/espace-client" 
              className="text-[#0055FF] bg-white px-3 py-1 rounded hover:bg-[#0055FF] hover:text-white font-bold transition-all duration-200"
            >
              Espace Client (Pro)
            </Link>
          </div>
        </div>
      </div>

      {/* ==========================================
          2. MAIN HEADER & BRAND ROW
          ========================================== */}
      <div className="w-full bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
          
          {/* Logo Brand area */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center group">
              <img src="/logo.svg" alt="ELECZAR Logo" className="h-10 w-auto" />
            </Link>
            
            {/* ==========================================
                3. DESKTOP NAVIGATION LINKS
                ========================================== */}
            <nav className="hidden lg:flex items-center space-x-1">
              
              {/* Accueil */}
              <Link 
                href="/" 
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#0055FF] hover:bg-gray-50 transition-all duration-200"
              >
                Accueil
              </Link>

              {/* Produits (Mega Menu Trigger) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter("produits")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-all duration-200 ${
                    activeDropdown === "produits" 
                      ? "text-[#0055FF] bg-blue-50/50" 
                      : "text-gray-700 hover:text-[#0055FF] hover:bg-gray-50"
                  }`}
                  aria-expanded={activeDropdown === "produits"}
                >
                  <span>Produits</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transform transition-transform duration-200 ${activeDropdown === "produits" ? "rotate-180 text-[#0055FF]" : ""}`} />
                </button>
              </div>

              {/* Secteurs (Standard Dropdown Trigger) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter("secteurs")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-all duration-200 ${
                    activeDropdown === "secteurs" 
                      ? "text-[#0055FF] bg-blue-50/50" 
                      : "text-gray-700 hover:text-[#0055FF] hover:bg-gray-50"
                  }`}
                  aria-expanded={activeDropdown === "secteurs"}
                >
                  <span>Secteurs</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transform transition-transform duration-200 ${activeDropdown === "secteurs" ? "rotate-180 text-[#0055FF]" : ""}`} />
                </button>
              </div>

              {/* Services (Standard Dropdown Trigger) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 transition-all duration-200 ${
                    activeDropdown === "services" 
                      ? "text-[#0055FF] bg-blue-50/50" 
                      : "text-gray-700 hover:text-[#0055FF] hover:bg-gray-50"
                  }`}
                  aria-expanded={activeDropdown === "services"}
                >
                  <span>Services</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transform transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180 text-[#0055FF]" : ""}`} />
                </button>
              </div>

              {/* Blog */}
              <Link 
                href="/blog" 
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#0055FF] hover:bg-gray-50 transition-all duration-200"
              >
                Blog
              </Link>

              {/* À propos */}
              <Link 
                href="/a-propos" 
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#0055FF] hover:bg-gray-50 transition-all duration-200"
              >
                À propos
              </Link>
            </nav>
          </div>

          {/* Desktop Right items (Search bar & Contact Button) */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Interactive Search toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center animate-fade-in">
                  <input
                    type="text"
                    placeholder="Référence, marque, mot-clé..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 px-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0055FF] focus:ring-1 focus:ring-[#0055FF] transition-all"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2 text-gray-400 hover:text-[#0055FF] p-1">
                    <SearchIcon />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }} 
                    className="ml-2 text-xs text-gray-400 hover:text-gray-600 font-medium"
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-gray-50 rounded-full text-gray-500 hover:text-[#0055FF] transition-colors"
                  aria-label="Rechercher"
                >
                  <SearchIcon />
                </button>
              )}
            </div>

            {/* Premium styled Contact link button */}
            <Link 
              href="/contact" 
              className="px-5 py-2.5 rounded-lg text-sm font-bold border-2 border-[#0055FF] text-[#0055FF] hover:bg-[#0055FF] hover:text-white shadow-[0_4px_10px_-2px_rgba(0,85,255,0.1)] hover:shadow-[0_4px_15px_-1px_rgba(0,85,255,0.2)] transition-all duration-200 ease-in-out"
            >
              Contact
            </Link>
          </div>

          {/* ==========================================
              4. MOBILE HEADER ITEMS
              ========================================== */}
          <div className="flex lg:hidden items-center space-x-2">
            
            {/* Search Icon */}
            <button 
              onClick={() => {
                setMobileMenuOpen(true);
                // Trigger auto-focus search in mobile drawer
                setTimeout(() => {
                  document.getElementById("mobile-search-input")?.focus();
                }, 300);
              }}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-[#0055FF] transition-colors"
              aria-label="Rechercher"
            >
              <SearchIcon />
            </button>

            {/* Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-700 focus:outline-none"
              aria-label="Menu Principal"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* ==========================================
            5. DESKTOP MEGA-MENU PANEL (PRODUITS)
            ========================================== */}
        <div
          className={`absolute left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-out z-40 hidden lg:block ${
            activeDropdown === "produits"
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-2 pointer-events-none invisible"
          }`}
          onMouseEnter={() => handleMouseEnter("produits")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
            
            {/* Columns of Category links */}
            <div className="col-span-8 grid grid-cols-2 gap-8 border-r border-gray-100 pr-8">
              {produitsData.columns.map((col, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-800 pb-2 border-b border-gray-50">
                    {col.icon}
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                      {col.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {col.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className="group/item flex items-center text-sm font-medium text-gray-600 hover:text-[#0055FF] transition-colors duration-150"
                        >
                          <span className="w-1.5 h-1.5 bg-[#0055FF]/0 rounded-full mr-2 transition-all group-hover/item:bg-[#0055FF] group-hover/item:w-2"></span>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Premium CTA Card Column */}
            <div className="col-span-4 flex flex-col justify-between h-full bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="space-y-3">
                <span className="inline-block bg-[#0055FF]/10 text-[#0055FF] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                  {produitsData.promoCard.badge}
                </span>
                <h4 className="text-base font-bold text-gray-800">
                  {produitsData.promoCard.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {produitsData.promoCard.description}
                </p>
              </div>
              <Link
                href={produitsData.promoCard.href}
                className="mt-6 inline-flex items-center justify-center space-x-2 w-full py-3 bg-[#0055FF] hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>{produitsData.promoCard.cta}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ==========================================
            6. DESKTOP SECTEURS DROPDOWN
            ========================================== */}
        <div
          className={`absolute left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-out z-40 hidden lg:block ${
            activeDropdown === "secteurs"
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-2 pointer-events-none invisible"
          }`}
          onMouseEnter={() => handleMouseEnter("secteurs")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Secteurs d'Activité
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {secteursData.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50/30 transition-all duration-150"
                >
                  <div className="p-2 bg-gray-50 border border-gray-100 rounded-lg group-hover:bg-[#0055FF]/10 group-hover:border-transparent transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#0055FF] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            7. DESKTOP SERVICES DROPDOWN
            ========================================== */}
        <div
          className={`absolute left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-out z-40 hidden lg:block ${
            activeDropdown === "services"
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-2 pointer-events-none invisible"
          }`}
          onMouseEnter={() => handleMouseEnter("services")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-5xl mx-auto px-6 py-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Services & Support ELECZAR
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {servicesData.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-gray-100 hover:border-[#0055FF]/20 hover:bg-blue-50/20 shadow-sm hover:shadow transition-all duration-150"
                >
                  <div className="space-y-3">
                    <div className="p-2 bg-blue-50/50 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-[#0055FF] transition-colors">
                      <div className="group-hover:text-white [&>svg]:group-hover:text-white transition-colors duration-200">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#0055FF] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#0055FF] opacity-0 group-hover:opacity-100 mt-3 flex items-center space-x-1 transition-all transform translate-x-1 group-hover:translate-x-0">
                    <span>En savoir plus</span>
                    <span>&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          8. MOBILE DRAWER SLIDING SIDEBAR (ALL IN ONE)
          ========================================== */}
      
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide-out Sidebar Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.svg" alt="ELECZAR Logo" className="h-8 w-auto" />
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
            aria-label="Fermer le menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Rechercher disjoncteur, LED, câble..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0055FF] focus:ring-1 focus:ring-[#0055FF]"
            />
            <span className="absolute left-3.5 top-2.5 text-gray-400">
              <SearchIcon />
            </span>
          </form>

          {/* Mobile Links List */}
          <nav className="space-y-2">
            
            {/* Accueil */}
            <Link 
              href="/" 
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            {/* Produits Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => toggleAccordion("produits")}
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <span>Produits</span>
                <ChevronDownIcon className={`w-4 h-4 transform ${mobileActiveAccordions.produits ? "rotate-180 text-[#0055FF]" : "text-gray-400"}`} />
              </button>
              
              {mobileActiveAccordions.produits && (
                <div className="pl-4 pr-2 py-2 border-l-2 border-blue-50 space-y-4">
                  {produitsData.columns.map((col, cIdx) => (
                    <div key={cIdx} className="space-y-2">
                      <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#0055FF] px-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]"></span>
                        <span>{col.title}</span>
                      </h4>
                      <ul className="space-y-1">
                        {col.items.map((item, iIdx) => (
                          <li key={iIdx}>
                            <Link
                              href={item.href}
                              className="block px-3 py-2 rounded-md text-xs font-semibold text-gray-600 hover:text-[#0055FF] hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Secteurs Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => toggleAccordion("secteurs")}
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <span>Secteurs</span>
                <ChevronDownIcon className={`w-4 h-4 transform ${mobileActiveAccordions.secteurs ? "rotate-180 text-[#0055FF]" : "text-gray-400"}`} />
              </button>

              {mobileActiveAccordions.secteurs && (
                <div className="pl-4 pr-2 py-1 border-l-2 border-blue-50 space-y-1">
                  {secteursData.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-xs font-semibold text-gray-600 hover:text-[#0055FF] hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => toggleAccordion("services")}
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <span>Services</span>
                <ChevronDownIcon className={`w-4 h-4 transform ${mobileActiveAccordions.services ? "rotate-180 text-[#0055FF]" : "text-gray-400"}`} />
              </button>

              {mobileActiveAccordions.services && (
                <div className="pl-4 pr-2 py-1 border-l-2 border-blue-50 space-y-1">
                  {servicesData.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-xs font-semibold text-gray-600 hover:text-[#0055FF] hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog */}
            <Link 
              href="/blog" 
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            {/* À propos */}
            <Link 
              href="/a-propos" 
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
          </nav>
        </div>

        {/* Drawer Footer Details */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center space-x-2 font-medium">
              <PhoneIcon />
              <span>+212 535 000 000</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon />
              <span>Zone Industrielle, Meknès</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/espace-client"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 rounded-lg text-xs font-bold text-center text-[#1F2937] bg-white border border-gray-200 hover:bg-gray-100"
            >
              Client (Pro)
            </Link>
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 rounded-lg text-xs font-bold text-center text-white bg-[#0055FF] hover:bg-blue-600 shadow-sm"
            >
              Contact Direct
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
