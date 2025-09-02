import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Edit, Trash2, Calendar, User } from 'lucide-react';
import { useBriefings } from '@/hooks/useBriefings';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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

export const BriefingDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBriefing, deleteBriefing } = useBriefings();
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      loadBriefing(id);
    }
  }, [id]);

  const loadBriefing = async (briefingId: string) => {
    setLoading(true);
    const data = await getBriefing(briefingId);
    setBriefing(data);
    setLoading(false);
  };

  const handleEdit = () => {
    if (briefing) {
      navigate(`/briefings/${briefing.id}/edit`);
    }
  };

  const handleDelete = async () => {
    if (briefing) {
      const success = await deleteBriefing(briefing.id);
      if (success) {
        navigate('/briefings');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-muted text-muted-foreground';
      case 'in_progress':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'in_progress':
        return 'Em Progresso';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: string | null) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Não definida';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Briefing não encontrado</h1>
          <Button onClick={() => navigate('/briefings')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Briefings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/briefings')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{briefing.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Criado em {formatDate(briefing.created_at)}</span>
                </div>
                {briefing.updated_at !== briefing.created_at && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Atualizado em {formatDate(briefing.updated_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>

        {/* Status and Priority */}
        <div className="flex gap-2">
          <Badge className={getStatusColor(briefing.status)}>
            {getStatusLabel(briefing.status)}
          </Badge>
          <Badge variant="outline">
            Prioridade: {getPriorityLabel(briefing.priority)}
          </Badge>
        </div>

        {/* Content */}
        <div className="grid gap-6">
          {briefing.content && typeof briefing.content === 'object' && (
            <>
              {(briefing.content as any).objective && (
                <Card>
                  <CardHeader>
                    <CardTitle>Objetivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{(briefing.content as any).objective}</p>
                  </CardContent>
                </Card>
              )}

              {(briefing.content as any).target_audience && (
                <Card>
                  <CardHeader>
                    <CardTitle>Público-Alvo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{(briefing.content as any).target_audience}</p>
                  </CardContent>
                </Card>
              )}

              {(briefing.content as any).requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requisitos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{(briefing.content as any).requirements}</p>
                  </CardContent>
                </Card>
              )}

              {(briefing.content as any).deliverables && (
                <Card>
                  <CardHeader>
                    <CardTitle>Entregáveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{(briefing.content as any).deliverables}</p>
                  </CardContent>
                </Card>
              )}

              {(briefing.content as any).notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{(briefing.content as any).notes}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o briefing "{briefing.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};