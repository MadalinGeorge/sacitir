'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import * as motion from 'motion/react-client'
import type { Variants } from 'motion/react'
import { Globe } from 'lucide-react'

interface AnimatedMobileNavProps {
  isOpen: boolean
  toggleMenu: () => void
  navItems: { key: string; href: string }[]
}

export default function AnimatedMobileNav({ isOpen, toggleMenu, navItems }: AnimatedMobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useDimensions(containerRef)
  const { locale, setLocale } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="lg:hidden fixed top-0 left-0 bottom-0 w-full z-40"
    >
      <motion.div 
        className="absolute inset-0 bg-textWhite shadow-xl"
        variants={sidebarVariants} 
      />
      
      <Navigation navItems={navItems} toggleMenu={toggleMenu} />
      
      <MenuToggle toggle={toggleMenu} />
      
      {/* Language Toggle */}
      <motion.button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-2 text-secondaryBlack hover:text-mainRed transition-colors"
        variants={languageVariants}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">
          {mounted ? locale : 'es'}
        </span>
      </motion.button>
    </motion.nav>
  )
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const languageVariants = {
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

const Navigation = ({ navItems, toggleMenu }: { navItems: { key: string; href: string }[], toggleMenu: () => void }) => {
  return (
    <motion.ul className="flex flex-col space-y-4 pt-24 px-8" variants={navVariants}>
      {navItems.map((item) => (
        <MenuItem key={item.key} i={0} item={item} toggleMenu={toggleMenu} />
      ))}
    </motion.ul>
  )
}

const itemVariants = {
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

const MenuItem = ({ item, toggleMenu }: { i: number, item: { key: string; href: string }, toggleMenu: () => void }) => {
  const { t } = useLocale()
  
  return (
    <motion.li
      className="list-none"
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.href}
        className="flex items-center py-3 px-4 text-xl font-bold text-secondaryBlack hover:text-mainRed rounded-lg relative group"
        onClick={toggleMenu}
      >
        {t(item.key)}
        <span className="absolute -bottom-1 left-0 right-0 w-0 h-0.5 bg-mainRed transition-all duration-300 group-hover:w-full mx-auto" />
      </Link>
    </motion.li>
  )
}

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring" as const,
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring" as const,
      stiffness: 400,
      damping: 40
    }
  }
}

interface PathProps {
  d?: string
  variants: Variants
  transition?: { duration: number }
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#191923" // secondaryBlack color
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button 
    className="outline-none border-none cursor-pointer absolute top-4 left-4 w-12 h-12 rounded-full bg-transparent z-50"
    onClick={toggle}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
)

// Dimensions utility hook
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth
      dimensions.current.height = ref.current.offsetHeight
    }
  }, [ref])

  return dimensions.current
}