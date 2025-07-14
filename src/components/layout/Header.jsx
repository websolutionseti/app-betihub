import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
const Header = ({
  onMenuClick
}) => {
  const {
    toast
  } = useToast();
  const handleNotificationClick = () => {
    toast({
      title: "🔔 Notificações",
      description: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };
  const handleSearchClick = () => {
    toast({
      title: "🔍 Busca",
      description: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };
  const handleProfileClick = () => {
    toast({
      title: "👤 Perfil",
      description: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };
  return <header className="glass-effect border-b border-white/10 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </Button>

          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="hidden md:block">
            <h1 className="text-xl font-semibold text-white">Bem-vindo a Beti Hub</h1>
            <p className="text-sm text-gray-400">
              Gerencie seus dados com eficiência e estilo
            </p>
          </motion.div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleSearchClick} className="text-gray-300 hover:text-white hover:bg-white/10" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="relative text-gray-300 hover:text-white hover:bg-white/10" aria-label="Notificações">
            <Bell className="h-5 w-5" />
            <motion.div animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            repeat: Infinity,
            duration: 2
          }} className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleProfileClick} className="text-gray-300 hover:text-white hover:bg-white/10" aria-label="Perfil do usuário">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;