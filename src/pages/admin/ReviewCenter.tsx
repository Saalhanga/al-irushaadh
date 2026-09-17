import { useState, useMemo } from 'react';
import { useReviews, useSubmissions } from '@/hooks/use-collections';
import { useContent } from '@/hooks/use-content';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { Review, Submission } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, FileEdit } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type ReviewItem = (Review & { submission?: Submission }) | Submission;

const REVIEW_STATES = ['pending', 'reviewed', 'actioned'] as const;

const ReviewCenter = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: reviews, isLoading: reviewsLoading, refetch: refetchReviews } = useReviews();
  const { data: submissions, isLoading: submissionsLoading, refetch: refetchSubmissions } = useSubmissions();
  const { data: content } = useContent();

  const [tab, setTab] = useState<string>('pending');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selected, setSelected] = useState<ReviewItem | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | 'draft' | 'edit'>('approve');
  const [notes, setNotes] = useState('');

  if (!isAdmin) return null;

  const combinedItems = useMemo(() => {
    const items: ReviewItem[] = [];
    if (reviews) {
      reviews.forEach((review) => {
        items.push({ ...review });
      });
    }
    if (submissions) {
      submissions.forEach((submission) => {
        items.push(submission);
      });
    }
    return items;
  }, [reviews, submissions]);

  const filteredItems = useMemo(() => {
    if (tab === 'all') return combinedItems;
    return combinedItems.filter((item) => {
      if ('state' in item) {
        if (tab === 'pending') return item.state === 'pending';
        if (tab === 'reviewed') return item.state === 'reviewed';
        if (tab === 'actioned') return item.state === 'actioned';
      }
      return false;
    });
  }, [combinedItems, tab]);

  const openReview = (item: ReviewItem) => {
    setSelected(item);
    setAction('approve');
    setNotes('');
    setReviewOpen(true);
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    try {
      if ('item_id' in selected) {
        const { error } = await supabase
          .from('reviews')
          .update({ state: action === 'approve' ? 'actioned' : action === 'reject' ? 'reviewed' : 'reviewed', notes: notes || null })
          .eq('id', selected.id);
        if (error) throw error;
      } else if (selected.state === 'new' || selected.state === 'needs_review') {
        const newState = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'draft';
        await supabase
          .from('submissions')
          .update({ state: newState, notes: notes || null, reviewed_at: new Date().toISOString() })
          .eq('id', selected.id);
      }
      toast.success('Review updated');
      setReviewOpen(false);
      refetchReviews();
      refetchSubmissions();
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    }
  };

  const isLoading = reviewsLoading || submissionsLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('admin.reviewCenter')}</h1>
        <p className="text-muted-foreground">{t('admin.reviewQueue')}</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          <TabsTrigger value="actioned">Actioned</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead className="text-right">{t('admin.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                    </TableRow>
                  ) : filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow key={'item_id' in item ? item.id : item.id}>
                        <TableCell>
                          <Badge variant="outline">{'item_type' in item ? item.item_type : 'submission'}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {'title' in item ? item.title : `Review #${item.id.slice(0, 8)}`}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.state === 'pending' ? 'secondary' : item.state === 'actioned' ? 'default' : 'outline'}>
                            {item.state}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openReview(item)}>
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
        </TabsContent>
      </Tabs>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('submission.review')}</DialogTitle>
          </DialogHeader>
          {selected && (
            <form onSubmit={handleAction} className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">{'item_type' in selected ? selected.item_type : 'submission'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Item</p>
                <p className="text-sm text-muted-foreground">{'title' in selected ? selected.title : `ID: ${selected.id}`}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="action">{t('admin.actions')}</Label>
                <Select value={action} onValueChange={(value: 'approve' | 'reject' | 'draft' | 'edit') => setAction(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve & Publish</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="draft">Save Draft</SelectItem>
                    <SelectItem value="edit">Edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">{t('review.notes')}</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setReviewOpen(false)}>{t('admin.cancel')}</Button>
                <Button type="submit">{t('admin.save')}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewCenter;
