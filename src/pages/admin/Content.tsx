import { useState, useMemo } from 'react';
import { useContent, useCreateContent, useUpdateContent, useDeleteContent } from '@/hooks/use-content';
import { useSheikhs } from '@/hooks/use-sheikhs';
import { useTopics } from '@/hooks/use-topics';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { Content, ContentType, ContentState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getContentTypeLabel } from '@/lib/utils';

const CONTENT_TYPES: ContentType[] = ['audio', 'video', 'article', 'pdf', 'image', 'qna', 'quran', 'dua', 'interview', 'discussion', 'short_clip', 'lecture_series', 'course'];
const CONTENT_STATES: ContentState[] = ['draft', 'pending_review', 'published', 'unavailable', 'archived', 'rejected'];

const emptyForm = () => ({
  title: '',
  description: '',
  type: 'audio' as ContentType,
  sheikh_id: '',
  topics: '',
  tags: '',
  language: '',
  event: '',
  location: '',
  date: '',
  source_url: '',
  source_platform: '',
  publisher: '',
  state: 'draft' as ContentState,
  file_path: '',
  external_url: '',
  duration: '',
  page_count: '',
});

const Content = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: content, isLoading } = useContent();
  const { data: sheikhs } = useSheikhs();
  const { data: topics } = useTopics();
  const createMutation = useCreateContent();
  const updateMutation = useUpdateContent();
  const deleteMutation = useDeleteContent();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Content | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!isAdmin) return null;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (item: Content) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      type: item.type,
      sheikh_id: item.sheikh_id || '',
      topics: item.topics.join(', '),
      tags: item.tags.join(', '),
      language: item.language,
      event: item.event || '',
      location: item.location || '',
      date: item.date || '',
      source_url: item.source_url || '',
      source_platform: item.source_platform || '',
      publisher: item.publisher || '',
      state: item.state,
      file_path: item.file_path || '',
      external_url: item.external_url || '',
      duration: item.duration?.toString() || '',
      page_count: item.page_count?.toString() || '',
    });
    setOpen(true);
  };

  const sheikhMap = useMemo(() => {
    if (!sheikhs) return {};
    return sheikhs.reduce((acc, s) => { acc[s.id] = s.name; return acc; }, {} as Record<string, string>);
  }, [sheikhs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Partial<Content> = {
      title: form.title,
      description: form.description,
      type: form.type,
      sheikh_id: form.sheikh_id || null,
      topics: form.topics.split(',').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      language: form.language,
      event: form.event || null,
      location: form.location || null,
      date: form.date || null,
      source_url: form.source_url || null,
      source_platform: form.source_platform || null,
      publisher: form.publisher || null,
      state: form.state,
      file_path: form.file_path || null,
      external_url: form.external_url || null,
      duration: form.duration ? Number(form.duration) : null,
      page_count: form.page_count ? Number(form.page_count) : null,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...data });
        toast.success('Content updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Content created');
      }
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Content deleted');
      setDeleteId(null);
    } catch (err: any) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const stateBadge = (state: ContentState) => {
    const variants: Record<ContentState, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      draft: 'secondary',
      pending_review: 'outline',
      published: 'default',
      unavailable: 'destructive',
      archived: 'secondary',
      rejected: 'destructive',
    };
    return <Badge variant={variants[state]}>{state}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-foreground">{t('admin.contentManagement')}</h1>
          <p className="text-muted-foreground">Manage content</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={18} className="mr-2" /> {t('admin.add')}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.title')}</TableHead>
                <TableHead>{t('admin.type')}</TableHead>
                <TableHead>{t('admin.sheikh')}</TableHead>
                <TableHead>{t('admin.state')}</TableHead>
                <TableHead>{t('admin.date')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                </TableRow>
              ) : !content || content.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                </TableRow>
              ) : (
                content.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getContentTypeLabel(item.type)}</Badge>
                    </TableCell>
                    <TableCell>{sheikhMap[item.sheikh_id || ''] || '-'}</TableCell>
                    <TableCell>{stateBadge(item.state)}</TableCell>
                    <TableCell>{item.date || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)}>
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? t('admin.editContent') : t('admin.addContent')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">{t('admin.title')}</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">{t('admin.description')}</Label>
                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">{t('admin.type')}</Label>
                <Select value={form.type} onValueChange={(value: ContentType) => setForm({ ...form, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{getContentTypeLabel(type)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sheikh_id">{t('admin.sheikh')}</Label>
                <Select value={form.sheikh_id} onValueChange={(value) => setForm({ ...form, sheikh_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('admin.selectSheikh')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {sheikhs?.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="topics">{t('admin.topics')} ({t('admin.commaSeparated')})</Label>
                <Input id="topics" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tags">{t('admin.tags')} ({t('admin.commaSeparated')})</Label>
                <Input id="tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">{t('admin.language')}</Label>
                <Input id="language" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{t('admin.state')}</Label>
                <Select value={form.state} onValueChange={(value: ContentState) => setForm({ ...form, state: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event">{t('admin.event')}</Label>
                <Input id="event" value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t('admin.location')}</Label>
                <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">{t('admin.date')}</Label>
                <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source_url">{t('admin.sourceUrl')}</Label>
                <Input id="source_url" value={form.source_url} onChange={(e) => setForm({ ...form, source_url: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source_platform">{t('admin.sourcePlatform')}</Label>
                <Input id="source_platform" value={form.source_platform} onChange={(e) => setForm({ ...form, source_platform: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher">{t('admin.publisher')}</Label>
                <Input id="publisher" value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file_path">{t('admin.filePath')}</Label>
                <Input id="file_path" value={form.file_path} onChange={(e) => setForm({ ...form, file_path: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="external_url">{t('admin.externalUrl')}</Label>
                <Input id="external_url" value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">{t('admin.duration')}</Label>
                <Input id="duration" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="page_count">{t('admin.pageCount')}</Label>
                <Input id="page_count" type="number" value={form.page_count} onChange={(e) => setForm({ ...form, page_count: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{t('admin.cancel')}</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{t('admin.save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.delete')}</AlertDialogTitle>
            <AlertDialogDescription>{t('admin.confirmDelete')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin.no')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>{t('admin.yes')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Content;
