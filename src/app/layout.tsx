import React from 'react';
import './globals.css';
import { Inter } from "next/font/google";
import ClientProviders from '@/components/ClientProviders';
import type { Viewport } from "next";
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
