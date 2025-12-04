import React from 'react';

// Root layout - passthrough to allow language-specific layouts to define <html> and <body>
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
