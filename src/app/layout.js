"use client";

import { Layout } from "antd";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

import { layoutStyles } from "./page.module.css";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Layout
              className={`justify-content-center align-items-center ${layoutStyles}`}
            >
              {children}
            </Layout>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
