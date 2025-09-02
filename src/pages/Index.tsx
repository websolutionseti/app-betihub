import { BriefingHeader } from "@/components/briefing/BriefingHeader";
import { BriefingFlow } from "@/components/briefing/BriefingFlow";
import { MermaidDiagram } from "@/components/briefing/MermaidDiagram";
import { DatabaseDiagrams } from "@/components/briefing/DatabaseDiagrams";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  FileText, 
  GitBranch, 
  Settings,
  BarChart3,
  Users
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <BriefingHeader 
          currentStep={2}
          totalSteps={6}
          completedSections={1}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Flow */}
          <div className="lg:col-span-2">
            <BriefingFlow />
          </div>

          {/* Right Column - Tools & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Database className="h-4 w-4" />
                  Configurar Banco de Dados
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Gerar Relatório
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <GitBranch className="h-4 w-4" />
                  Ver Fluxo Completo
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Button>
              </div>
            </Card>

            {/* Module Status */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Status dos Módulos</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Coleta de Informações</span>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-accent" />
                    <span className="text-sm">Banco de Dados</span>
                  </div>
                  <Badge variant="secondary">Planejado</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Relatórios</span>
                  </div>
                  <Badge variant="secondary">Planejado</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Fluxo Visual</span>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
              </div>
            </Card>

            {/* Feature Request */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">Novidade!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Branch feat/briefing-module criado com sucesso. Todos os módulos planejados foram adicionados ao roadmap.
              </p>
              <Button size="sm" variant="outline">
                Ver Detalhes
              </Button>
            </Card>
          </div>
        </div>

        {/* Mermaid Diagram Section */}
        <MermaidDiagram />

        {/* Database Diagrams Section */}
        <DatabaseDiagrams />

        {/* Architecture Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">UML & Modelagem</h3>
            <p className="text-sm text-muted-foreground">
              Diagramas UML, MER e DER automatizados
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Relatórios Visuais</h3>
            <p className="text-sm text-muted-foreground">
              Geração automática de relatórios personalizados
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Dashboards e métricas em tempo real
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
