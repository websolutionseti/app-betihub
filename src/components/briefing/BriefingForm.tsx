import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, ArrowLeft } from 'lucide-react';

type Briefing = {
  id: string;
  user_id: string;
  title: string;
  content: any;
  status: string;
  priority: string | null;
  created_at: string;
  updated_at: string;
};

type BriefingInsert = Omit<Briefing, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
type BriefingUpdate = Partial<Omit<Briefing, 'id' | 'user_id' | 'created_at'>>;

interface BriefingFormProps {
  briefing?: Briefing;
  onSave: (data: BriefingInsert | BriefingUpdate) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const BriefingForm: React.FC<BriefingFormProps> = ({
  briefing,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: {} as any,
    status: 'draft' as const,
    priority: 'medium' as const,
  });

  useEffect(() => {
    if (briefing) {
      setFormData({
        title: briefing.title,
        content: briefing.content || {},
        status: briefing.status as any,
        priority: (briefing.priority as any) || 'medium',
      });
    }
  }, [briefing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleContentChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={onCancel}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>
              {briefing ? 'Editar Briefing' : 'Novo Briefing'}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Briefing *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="Digite o título do briefing"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="in_progress">Em Progresso</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conteúdo do Briefing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Conteúdo do Briefing</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objective">Objetivo</Label>
                <Textarea
                  id="objective"
                  value={formData.content.objective || ''}
                  onChange={(e) => handleContentChange('objective', e.target.value)}
                  placeholder="Descreva o objetivo principal do briefing"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_audience">Público-Alvo</Label>
                <Textarea
                  id="target_audience"
                  value={formData.content.target_audience || ''}
                  onChange={(e) => handleContentChange('target_audience', e.target.value)}
                  placeholder="Descreva o público-alvo"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requisitos</Label>
                <Textarea
                  id="requirements"
                  value={formData.content.requirements || ''}
                  onChange={(e) => handleContentChange('requirements', e.target.value)}
                  placeholder="Liste os principais requisitos"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliverables">Entregáveis</Label>
                <Textarea
                  id="deliverables"
                  value={formData.content.deliverables || ''}
                  onChange={(e) => handleContentChange('deliverables', e.target.value)}
                  placeholder="Liste os entregáveis esperados"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.content.notes || ''}
                  onChange={(e) => handleContentChange('notes', e.target.value)}
                  placeholder="Observações adicionais"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={loading || !formData.title.trim()}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};