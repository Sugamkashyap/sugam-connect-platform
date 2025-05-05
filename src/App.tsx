
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Dashboard/Settings";
import Appointments from "./pages/Dashboard/Appointments";
import Clients from "./pages/Dashboard/Clients";
import Messages from "./pages/Dashboard/Messages";
import Documents from "./pages/Dashboard/Documents";
import Workflows from "./pages/Dashboard/Workflows";
import SiteManagement from "./pages/Dashboard/SiteManagement";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AppProviders>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/appointment" element={<Layout><Appointment /></Layout>} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute adminOnly>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="clients" element={<Clients />} />
            <Route path="messages" element={<Messages />} />
            <Route path="documents" element={<Documents />} />
            <Route path="workflows" element={<Workflows />} />
            <Route path="site-management" element={<SiteManagement />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </AppProviders>
  );
}

export default App;
