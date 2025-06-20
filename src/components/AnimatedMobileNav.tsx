'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { motion, Variants } from 'framer-motion'

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