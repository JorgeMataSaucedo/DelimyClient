import React from "react";
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home, Courses, Blog, Post } from "../pages/web";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/cursos" element={loadLayout(ClientLayout, Courses)} />
      <Route path="/tutorials" element={loadLayout(ClientLayout, Blog)} />
      <Route path="/tutorials/:path" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}
