import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Clock,
  AlertCircle
} from "lucide-react";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  estimatedTime: string;
  dependencies?: string[];
}

const briefingSteps: FlowStep[] = [
  {
    id: 'client-info',
    title: 'Informações do Cliente',
    description: 'Dados básicos e contexto empresarial',
    status: 'completed',
    estimatedTime: '5 min'
  },
  {
    id: 'business-analysis',
    title: 'Análise de Negócio',
    description: 'Modelo de negócio, concorrência e mercado',
    status: 'current',
    estimatedTime: '15 min'
  },
  {
    id: 'objectives',
    title: 'Objetivos e Metas',
    description: 'Definição de KPIs e resultados esperados',
    status: 'pending',
    estimatedTime: '10 min',
    dependencies: ['business-analysis']
  },
  {
    id: 'resources',
    title: 'Recursos Disponíveis',
    description: 'Orçamento, equipe e ferramentas',
    status: 'pending',
    estimatedTime: '8 min',
    dependencies: ['objectives']
  },
  {
    id: 'timeline',
    title: 'Cronograma',
    description: 'Prazos e marcos importantes',
    status: 'pending',
    estimatedTime: '12 min',
    dependencies: ['resources']
  },
  {
    id: 'report-generation',
    title: 'Geração de Relatório',
    description: 'Compilação automática dos dados coletados',
    status: 'pending',
    estimatedTime: '2 min',
    dependencies: ['timeline']
  }
];

const getStatusIcon = (status: FlowStep['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-accent" />;
    case 'current':
      return <Clock className="h-5 w-5 text-primary animate-pulse" />;
    case 'blocked':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    default:
      return <Circle className="h-5 w-5 text-muted-foreground" />;
  }
};

const getStatusColor = (status: FlowStep['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-accent/10 border-accent text-accent';
    case 'current':
      return 'bg-primary/10 border-primary text-primary';
    case 'blocked':
      return 'bg-destructive/10 border-destructive text-destructive';
    default:
      return 'bg-muted/10 border-muted-foreground text-muted-foreground';
  }
};

export const BriefingFlow = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Fluxo do Briefing</h2>
          <p className="text-muted-foreground">
            Acompanhe o progresso do processo de consultoria
          </p>
        </div>
        <Button variant="outline" size="sm">
          Visualizar Diagrama Completo
        </Button>
      </div>

      <div className="space-y-4">
        {briefingSteps.map((step, index) => (
          <Card key={step.id} className="p-6 transition-all hover:shadow-md">
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(step.status)}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <Badge variant="outline" className={getStatusColor(step.status)}>
                    {step.status === 'current' ? 'Em Andamento' : 
                     step.status === 'completed' ? 'Concluído' :
                     step.status === 'blocked' ? 'Bloqueado' : 'Pendente'}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {step.estimatedTime}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3">
                  {step.description}
                </p>

                {step.dependencies && (
                  <div className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Depende de:</span>{' '}
                    {step.dependencies.map((dep, idx) => (
                      <Badge key={dep} variant="outline" className="ml-1 text-xs">
                        {briefingSteps.find(s => s.id === dep)?.title}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {step.status === 'current' && (
                    <Button size="sm" className="gap-2">
                      Continuar Etapa
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  {step.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      Revisar
                    </Button>
                  )}
                  {step.status === 'pending' && step.dependencies?.every(dep => 
                    briefingSteps.find(s => s.id === dep)?.status === 'completed'
                  ) && (
                    <Button variant="outline" size="sm">
                      Iniciar
                    </Button>
                  )}
                </div>
              </div>

              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${step.status === 'completed' ? 'bg-accent text-white' :
                    step.status === 'current' ? 'bg-primary text-white' :
                    'bg-muted text-muted-foreground'}
                `}>
                  {index + 1}
                </div>
              </div>
            </div>

            {/* Connection Line */}
            {index < briefingSteps.length - 1 && (
              <div className="ml-6 mt-4 h-6 w-px bg-border"></div>
            )}
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">Resumo do Progresso</h3>
            <p className="text-muted-foreground">
              1 de 6 etapas concluídas • Tempo estimado restante: 47 minutos
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">17%</p>
            <p className="text-sm text-muted-foreground">Completo</p>
          </div>
        </div>
      </Card>
    </div>
  );
};