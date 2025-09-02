import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BriefingForm } from '@/components/briefing/BriefingForm';
import { useBriefings } from '@/hooks/useBriefings';
import { Skeleton } from '@/components/ui/skeleton';

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

export const BriefingFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createBriefing, updateBriefing, getBriefing } = useBriefings();
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);

  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      loadBriefing(id);
    }
  }, [id]);

  const loadBriefing = async (briefingId: string) => {
    setInitialLoading(true);
    const data = await getBriefing(briefingId);
    setBriefing(data);
    setInitialLoading(false);
  };

  const handleSave = async (data: any) => {
    setLoading(true);
    
    if (isEditing && briefing) {
      const updated = await updateBriefing(briefing.id, data);
      if (updated) {
        navigate('/briefings');
      }
    } else {
      const created = await createBriefing(data);
      if (created) {
        navigate('/briefings');
      }
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    navigate('/briefings');
  };

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BriefingForm
        briefing={briefing || undefined}
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};