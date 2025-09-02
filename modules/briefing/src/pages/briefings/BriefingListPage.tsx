import { useNavigate } from 'react-router-dom';
import { BriefingList } from '@/components/briefing/BriefingList';
import { useBriefings } from '@/hooks/useBriefings';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';

export const BriefingListPage = () => {
  const navigate = useNavigate();
  const { briefings, loading, deleteBriefing } = useBriefings();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreateNew = () => {
    navigate('/briefings/new');
  };

  const handleView = (id: string) => {
    navigate(`/briefings/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/briefings/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteBriefing(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BriefingList
        briefings={briefings}
        loading={loading}
        onCreateNew={handleCreateNew}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este briefing? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};