'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import React, { useState } from 'react'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
