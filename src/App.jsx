import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import Posts from '@/pages/Posts';
import Analytics from '@/pages/Analytics';

function App() {
  return (
    <>
      <Helmet>
        <title>Sistema PDR - Plataforma de Desenvolvimento</title>
        <meta name="description" content="Sistema moderno de gestão com dashboard interativo, análises avançadas e interface acessível" />
      </Helmet>
      
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </>
  );
}

export default App;