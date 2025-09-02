import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  GitBranch, 
  Box, 
  Download,
  Maximize2,
  RefreshCw
} from "lucide-react";

export const DatabaseDiagrams = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold mb-1">Diagramas de Arquitetura</h3>
          <p className="text-muted-foreground">
            UML, MER e DER do sistema de briefing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <RefreshCw className="h-3 w-3" />
            Atualizado automaticamente
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Todos
          </Button>
        </div>
      </div>

      <Tabs defaultValue="uml" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="uml" className="gap-2">
            <Box className="h-4 w-4" />
            UML
          </TabsTrigger>
          <TabsTrigger value="mer" className="gap-2">
            <Database className="h-4 w-4" />
            MER
          </TabsTrigger>
          <TabsTrigger value="der" className="gap-2">
            <GitBranch className="h-4 w-4" />
            DER
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uml" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Diagrama de Classes UML</h4>
              <Button variant="outline" size="sm" className="gap-2">
                <Maximize2 className="h-4 w-4" />
                Visualizar Completo
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border min-h-[300px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                {/* Cliente Class */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="bg-primary text-white text-center py-2 rounded-t text-sm font-semibold">
                    Cliente
                  </div>
                  <div className="text-xs space-y-1 mt-2">
                    <div className="font-medium">Atributos:</div>
                    <div className="text-muted-foreground">
                      - id: String<br/>
                      - nome: String<br/>
                      - email: String<br/>
                      - empresa: String<br/>
                      - telefone: String
                    </div>
                    <div className="font-medium mt-2">Métodos:</div>
                    <div className="text-muted-foreground">
                      + criarBriefing()<br/>
                      + visualizarRelatorio()
                    </div>
                  </div>
                </div>

                {/* Briefing Class */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="bg-accent text-white text-center py-2 rounded-t text-sm font-semibold">
                    Briefing
                  </div>
                  <div className="text-xs space-y-1 mt-2">
                    <div className="font-medium">Atributos:</div>
                    <div className="text-muted-foreground">
                      - id: String<br/>
                      - clienteId: String<br/>
                      - status: Enum<br/>
                      - progresso: Number<br/>
                      - dataCreated: Date
                    </div>
                    <div className="font-medium mt-2">Métodos:</div>
                    <div className="text-muted-foreground">
                      + salvarProgresso()<br/>
                      + gerarRelatorio()
                    </div>
                  </div>
                </div>

                {/* Relatorio Class */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="bg-orange-500 text-white text-center py-2 rounded-t text-sm font-semibold">
                    Relatorio
                  </div>
                  <div className="text-xs space-y-1 mt-2">
                    <div className="font-medium">Atributos:</div>
                    <div className="text-muted-foreground">
                      - id: String<br/>
                      - briefingId: String<br/>
                      - formato: String<br/>
                      - conteudo: JSON<br/>
                      - dataGerada: Date
                    </div>
                    <div className="font-medium mt-2">Métodos:</div>
                    <div className="text-muted-foreground">
                      + exportarPDF()<br/>
                      + compartilhar()
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mer" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Modelo Entidade-Relacionamento</h4>
              <Button variant="outline" size="sm" className="gap-2">
                <Maximize2 className="h-4 w-4" />
                Visualizar Completo
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border min-h-[300px]">
              <div className="flex items-center justify-center h-full">
                <div className="grid grid-cols-3 gap-8 items-center">
                  {/* Cliente Entity */}
                  <div className="text-center">
                    <div className="w-24 h-16 bg-primary rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      CLIENTE
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Entidade Principal
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="text-center">
                    <div className="w-32 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm mb-2">
                      POSSUI
                    </div>
                    <div className="text-xs text-muted-foreground">
                      1:N
                    </div>
                  </div>

                  {/* Briefing Entity */}
                  <div className="text-center">
                    <div className="w-24 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      BRIEFING
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Entidade Dependente
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="der" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Diagrama Entidade-Relacionamento</h4>
              <Button variant="outline" size="sm" className="gap-2">
                <Maximize2 className="h-4 w-4" />
                Visualizar Completo
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border min-h-[300px]">
              <div className="space-y-6">
                {/* Tables Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Clientes Table */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-primary text-white px-4 py-2 font-semibold">
                      🗂️ clientes
                    </div>
                    <div className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">id</span>
                        <span className="text-yellow-600">PK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>nome</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>email</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>empresa</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>created_at</span>
                        <span className="text-muted-foreground">TIMESTAMP</span>
                      </div>
                    </div>
                  </div>

                  {/* Briefings Table */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-accent text-white px-4 py-2 font-semibold">
                      📋 briefings
                    </div>
                    <div className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">id</span>
                        <span className="text-yellow-600">PK</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">cliente_id</span>
                        <span className="text-blue-600">FK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>status</span>
                        <span className="text-muted-foreground">ENUM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>progresso</span>
                        <span className="text-muted-foreground">INTEGER</span>
                      </div>
                      <div className="flex justify-between">
                        <span>dados_coletados</span>
                        <span className="text-muted-foreground">JSON</span>
                      </div>
                    </div>
                  </div>

                  {/* Relatorios Table */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-orange-500 text-white px-4 py-2 font-semibold">
                      📊 relatorios
                    </div>
                    <div className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">id</span>
                        <span className="text-yellow-600">PK</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">briefing_id</span>
                        <span className="text-blue-600">FK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>formato</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>conteudo</span>
                        <span className="text-muted-foreground">TEXT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>url_arquivo</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                    </div>
                  </div>

                  {/* Templates Table */}  
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-purple-500 text-white px-4 py-2 font-semibold">
                      🎨 templates
                    </div>
                    <div className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">id</span>
                        <span className="text-yellow-600">PK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>nome</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>categoria</span>
                        <span className="text-muted-foreground">VARCHAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>estrutura</span>
                        <span className="text-muted-foreground">JSON</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ativo</span>
                        <span className="text-muted-foreground">BOOLEAN</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Relationships Legend */}
                <div className="bg-white/80 rounded-lg p-4 border border-dashed">
                  <div className="text-sm font-medium mb-2">Relacionamentos:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>clientes (1) → briefings (N)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>briefings (1) → relatorios (N)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span>templates (N) → briefings (N)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};