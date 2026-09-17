import { useState } from 'react';
import { useSubmissions, useUpdateSubmission } from '@/hooks/use-collections';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { Submission } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { getContentTypeLabel } from '@/lib/utils';

const SUBMISSION_STATES: Submission['state'][] = ['new', 'needs_review', 'approved', 'rejected'];

const Submissions = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: submissions, isLoading, refetch } = useSubmissions();
  const updateMutation = useUpdateSubmission();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [reviewState, setReviewState] = useState<Submission['state']>('approved');
  const [notes, setNotes] = useState('');

  if (!isAdmin) return null;

  const openReview = (submission: Submission) => {
    setSelected(submission);
    setReviewState(submission.state === 'new' || submission.state === 'needs_review' ? 'approved' : submission.state);
    setNotes('');
    setReviewOpen(true);
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    try {
      await updateMutation.mutateAsync({ id: selected.id, state: reviewState, notes: notes || null, reviewed_at: new Date().toISOString() });
      toast.success('Submission updated');
      setReviewOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Update failed');
    }
  };

  const stateBadge = (state: Submission['state']) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'secondary',
      needs_review: 'outline',
      approved: 'default',
      rejected: 'destructive',
    };
    return <Badge variant={variants[state]}>{state}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('admin.submissions')}</h1>
        <p className="text-muted-foreground">Review and manage submissions</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('submission.titleField')}</TableHead>
                <TableHead>{t('submission.type')}</TableHead>
                <TableHead>{t('admin.state')}</TableHead>
                <TableHead>{t('submission.date')}</TableHead>
                <TableHead className="text-right">{t('submission.review')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                </TableRow>
              ) : !submissions || submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                </TableRow>
              ) : (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getContentTypeLabel(submission.type)}</Badge>
                    </TableCell>
                    <TableCell>{stateBadge(submission.state)}</TableCell>
                    <TableCell>{submission.date || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openReview(submission)}>
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('submission.review')}</DialogTitle>
          </DialogHeader>
          {selected && (
            <form onSubmit={handleReview} className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">{t('submission.titleField')}</p>
                <p className="text-sm text-muted-foreground">{selected.title}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{t('submission.description')}</p>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{t('admin.state')}</Label>
                <Select value={reviewState} onValueChange={(value: Submission['state']) => setReviewState(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBMISSION_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">{t('review.notes')}</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setReviewOpen(false)}>{t('admin.cancel')}</Button>
                <Button type="submit" disabled={updateMutation.isPending}>{t('admin.save')}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Submissions;
