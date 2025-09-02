import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardList, 
  Users, 
  BarChart3, 
  FileText,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface BriefingHeaderProps {
  currentStep: number;
  totalSteps: number;
  completedSections: number;
}

export const BriefingHeader = ({ 
  currentStep, 
  totalSteps, 
  completedSections 
}: BriefingHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Módulo de Briefing</h1>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              v1.0
            </Badge>
          </div>
          <p className="text-lg opacity-90 mb-6">
            Sistema inteligente de coleta de informações para consultoria digital
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white" />
                <div>
                  <p className="text-sm opacity-80">Clientes Ativos</p>
                  <p className="text-xl font-bold">24</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-white" />
                <div>
                  <p className="text-sm opacity-80">Relatórios</p>
                  <p className="text-xl font-bold">156</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-white" />
                <div>
                  <p className="text-sm opacity-80">Templates</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <div>
                  <p className="text-sm opacity-80">Concluídos</p>
                  <p className="text-xl font-bold">{completedSections}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Progresso do Briefing</h3>
            <p className="text-muted-foreground">
              Etapa {currentStep} de {totalSteps}
            </p>
          </div>
          <Badge variant="outline" className="text-primary border-primary">
            {Math.round(progressPercentage)}% Completo
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-3 mb-4" />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {completedSections} seções completadas
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            Próxima Etapa
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};