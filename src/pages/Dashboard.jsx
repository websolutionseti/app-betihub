import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, FileText, BarChart3, TrendingUp, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import DashboardChart from '@/components/charts/DashboardChart';

const Dashboard = () => {
  const { getTotalStats, users, posts, pageViews } = useStore();
  const stats = getTotalStats();

  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: 'Posts Publicados',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      change: '+8%'
    },
    {
      title: 'Visualizações Totais',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'from-green-500 to-emerald-500',
      change: '+23%'
    },
    {
      title: 'Média por Página',
      value: stats.avgViewsPerPage,
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      change: '+15%'
    }
  ];

  const recentActivity = [
    { type: 'user', message: 'Novo usuário registrado', time: '2 min atrás', icon: Users },
    { type: 'post', message: 'Post publicado', time: '5 min atrás', icon: FileText },
    { type: 'view', message: 'Pico de visualizações', time: '10 min atrás', icon: TrendingUp },
    { type: 'analytics', message: 'Relatório gerado', time: '15 min atrás', icon: BarChart3 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Sistema PDR</title>
        <meta name="description" content="Painel principal com métricas e análises do sistema PDR" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Visão geral do sistema e métricas principais</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Atualizado agora</span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} desde o último mês
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Análise de Visualizações</CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardChart data={pageViews} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{users.length}</div>
                  <p className="text-sm text-gray-400 mt-1">Usuários Ativos</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">{posts.length}</div>
                  <p className="text-sm text-gray-400 mt-1">Conteúdos Criados</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">
                    {Math.round(stats.totalViews / 30)}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Visualizações/Dia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;