import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileText, BarChart3, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
const navigation = [{
  name: 'Dashboard',
  href: '/',
  icon: LayoutDashboard
}, {
  name: 'Usuários',
  href: '/users',
  icon: Users
}, {
  name: 'Posts',
  href: '/posts',
  icon: FileText
}, {
  name: 'Analytics',
  href: '/analytics',
  icon: BarChart3
}];
const Sidebar = ({
  onClose
}) => {
  const location = useLocation();
  return <div className="flex h-full flex-col glass-effect border-r border-white/10">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Beti Hub</span>
        </div>
        
        {onClose && <button onClick={onClose} className="lg:hidden rounded-lg p-1 text-gray-400 hover:text-white transition-colors" aria-label="Fechar menu">
            <X className="h-5 w-5" />
          </button>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6" role="navigation" aria-label="Menu principal">
        {navigation.map((item, index) => {
        const isActive = location.pathname === item.href;
        return <motion.div key={item.name} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }}>
              <Link to={item.href} className={cn('group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200', isActive ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' : 'text-gray-300 hover:bg-white/5 hover:text-white')} aria-current={isActive ? 'page' : undefined}>
                <item.icon className={cn('mr-3 h-5 w-5 transition-colors', isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-white')} aria-hidden="true" />
                {item.name}
                
                {isActive && <motion.div layoutId="activeTab" className="ml-auto h-2 w-2 rounded-full bg-purple-400" transition={{
              type: "spring",
              damping: 30,
              stiffness: 400
            }} />}
              </Link>
            </motion.div>;
      })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <div className="rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3">
          <p className="text-xs text-gray-400">
            Sistema PDR v1.0
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Plataforma de Desenvolvimento
          </p>
        </div>
      </div>
    </div>;
};
export default Sidebar;