import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Maximize2, 
  Download, 
  Share2, 
  RefreshCw 
} from "lucide-react";

export const MermaidDiagram = () => {
  const mermaidCode = `
graph TD
    A[Início do Briefing] --> B{Cliente Cadastrado?}
    B -->|Não| C[Cadastro do Cliente]
    B -->|Sim| D[Análise de Negócio]
    C --> D
    D --> E[Definição de Objetivos]
    E --> F[Análise de Recursos]
    F --> G[Cronograma]
    G --> H[Validação com Cliente]
    H --> I{Aprovado?}
    I -->|Não| J[Revisão de Dados]
    J --> D
    I -->|Sim| K[Geração de Relatório]
    K --> L[Apresentação Final]
    L --> M[Encerramento]
    
    style A fill:#4F9CF9,stroke:#333,stroke-width:2px,color:#fff
    style M fill:#34D399,stroke:#333,stroke-width:2px,color:#fff
    style I fill:#F59E0B,stroke:#333,stroke-width:2px,color:#fff
    style K fill:#8B5CF6,stroke:#333,stroke-width:2px,color:#fff
  `;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold mb-1">Fluxo do Processo</h3>
          <p className="text-muted-foreground">
            Visualização completa do processo de consultoria
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <RefreshCw className="h-3 w-3" />
            Atualizado
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Maximize2 className="h-4 w-4" />
            Expandir
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Placeholder for Mermaid Diagram */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 border-2 border-dashed border-primary/20 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <div className="space-y-3">
              <div className="h-3 bg-primary rounded w-3/4 mx-auto"></div>
              <div className="flex justify-center gap-2">
                <div className="h-2 bg-accent rounded w-16"></div>
                <div className="h-2 bg-muted rounded w-16"></div>
              </div>
              <div className="h-3 bg-secondary rounded w-1/2 mx-auto"></div>
              <div className="flex justify-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
                <div className="w-6 h-6 bg-accent rounded-full"></div>
                <div className="w-6 h-6 bg-secondary rounded-full"></div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Diagrama Mermaid</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Visualização interativa do fluxo de consultoria
            </p>
            <Button variant="outline" size="sm">
              Carregar Diagrama Interativo
            </Button>
          </div>
        </div>
      </div>

      {/* Diagram Legend */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-sm">Início/Ações</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded"></div>
          <span className="text-sm">Conclusão</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm">Decisões</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm">Relatórios</span>
        </div>
      </div>

      {/* Mermaid Code Preview */}
      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
          Ver código Mermaid
        </summary>
        <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-x-auto">
          <code>{mermaidCode}</code>
        </pre>
      </details>
    </Card>
  );
};