import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Eye, Users, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import AnalyticsChart from '@/components/charts/AnalyticsChart';
import PageViewsChart from '@/components/charts/PageViewsChart';
const Analytics = () => {
  const {
    pageViews,
    users,
    posts,
    getTotalStats
  } = useStore();
  const stats = getTotalStats();
  const analyticsCards = [{
    title: 'Visualizações Totais',
    value: stats.totalViews.toLocaleString(),
    icon: Eye,
    color: 'from-blue-500 to-cyan-500',
    change: '+23%',
    description: 'Últimos 30 dias'
  }, {
    title: 'Usuários Ativos',
    value: stats.totalUsers,
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    change: '+12%',
    description: 'Crescimento mensal'
  }, {
    title: 'Conteúdos Publicados',
    value: stats.totalPosts,
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    change: '+8%',
    description: 'Este mês'
  }, {
    title: 'Engajamento Médio',
    value: `${stats.avgViewsPerPage}%`,
    icon: Activity,
    color: 'from-orange-500 to-red-500',
    change: '+15%',
    description: 'Taxa de interação'
  }];
  const topPages = pageViews.sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
  const recentActivity = [{
    action: 'Nova visualização',
    page: '/dashboard',
    time: '2 min atrás',
    views: 45
  }, {
    action: 'Pico de tráfego',
    page: '/users',
    time: '5 min atrás',
    views: 89
  }, {
    action: 'Conteúdo popular',
    page: '/posts',
    time: '10 min atrás',
    views: 156
  }, {
    action: 'Sessão ativa',
    page: '/analytics',
    time: '15 min atrás',
    views: 23
  }];
  return <>
      <Helmet>
        <title>Analytics - Sistema PDR</title>
        <meta name="description" content="Análises detalhadas e métricas de performance do sistema PDR" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analizar </h1>
            <p className="text-gray-400 mt-1">Análises detalhadas e métricas de performance</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Dados atualizados em tempo real</span>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsCards.map((card, index) => <motion.div key={card.title} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }}>
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color}`}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{card.value}</div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-green-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {card.change}
                    </p>
                    <p className="text-xs text-gray-500">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Page Views Chart */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.4
        }}>
            <Card>
              <CardHeader>
                <CardTitle>Visualizações por Página</CardTitle>
              </CardHeader>
              <CardContent>
                <PageViewsChart data={pageViews} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Analytics Overview */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.5
        }}>
            <Card>
              <CardHeader>
                <CardTitle>Tendências de Crescimento</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart data={pageViews} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Pages and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }}>
            <Card>
              <CardHeader>
                <CardTitle>Páginas Mais Visitadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPages.map((page, index) => <motion.div key={page.id} initial={{
                opacity: 0,
                x: -10
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.7 + index * 0.1
              }} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${index === 0 ? 'from-yellow-500 to-orange-500' : index === 1 ? 'from-gray-400 to-gray-600' : index === 2 ? 'from-orange-600 to-red-600' : 'from-purple-500 to-pink-500'} flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{page.page}</p>
                        <p className="text-xs text-gray-400">Página do sistema</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{page.viewCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">visualizações</p>
                    </div>
                  </motion.div>)}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }}>
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: 10
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.8 + index * 0.1
              }} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.page} • {activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 font-bold text-sm">+{activity.views}</p>
                      <p className="text-xs text-gray-400">views</p>
                    </div>
                  </motion.div>)}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Summary */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.9
      }}>
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">{Math.round(stats.totalViews / 7)}</div>
                  <p className="text-sm text-gray-400 mt-1">Visualizações/Semana</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">{Math.round(stats.totalViews / stats.totalUsers)}</div>
                  <p className="text-sm text-gray-400 mt-1">Views por Usuário</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">{Math.round(stats.totalPosts / stats.totalUsers * 100)}%</div>
                  <p className="text-sm text-gray-400 mt-1">Taxa de Publicação</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                  <div className="text-2xl font-bold text-orange-400">98.5%</div>
                  <p className="text-sm text-gray-400 mt-1">Uptime do Sistema</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>;
};
export default Analytics;