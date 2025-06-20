'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { motion, Variants } from 'framer-motion'
import { Globe } from 'lucide-react'

interface AnimatedMobileNavProps {
  isOpen: boolean
  toggleMenu: () => void
  navItems: { key: string; href: string }[]
}

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

const sidebarVariants: Variants = {
  open: {
    clipPath: `circle(150% at 100% 0%)`,
    transition: {
      type: "spring",
      stiffness: 40,
      restDelta: 2
    }
  },
  closed: {
    clipPath: "circle(0% at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      delay: 0.2
    }
  }
};

export default function AnimatedMobileNav({ isOpen, toggleMenu, navItems }: AnimatedMobileNavProps) {
  const { t } = useLocale()
  
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="lg:hidden fixed inset-0 w-full h-full bg-textWhite z-40"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <motion.ul 
        className="w-full h-full flex flex-col items-center justify-center space-y-4" 
        variants={navVariants}
      >
        {navItems.map((item) => (
          <motion.li
            key={item.key}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className="block py-3 px-4 text-2xl font-bold text-secondaryBlack hover:text-mainRed"
              onClick={toggleMenu}
            >
              {t(item.key)}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

// Language Toggle
const languageVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.7 }
  },
  closed: {
    opacity: 0,
    x: 20
  }
}

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button 
    className="outline-none border-none cursor-pointer absolute top-4 left-4 w-12 h-12 rounded-full bg-transparent z-50"
    onClick={toggle}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="#191923" // secondaryBlack color
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
)

// Language Toggle
const LanguageToggle = ({ toggleLanguage }: { toggleLanguage: () => void }) => (
  <motion.button
    onClick={toggleLanguage}
    className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-2 text-secondaryBlack hover:text-mainRed transition-colors"
    variants={languageVariants}
  >
    <Globe className="w-4 h-4" />
    <span className="text-sm font-medium uppercase">
      {/* Placeholder for language toggle */}
    </span>
  </motion.button>
)