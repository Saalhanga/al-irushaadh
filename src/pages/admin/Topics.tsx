import { useState } from 'react';
import { useTopics, useCreateTopic, useUpdateTopic, useDeleteTopic } from '@/hooks/use-topics';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { Topic } from '@/lib/types';
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

const emptyForm = () => ({
  name: '',
  slug: '',
  locale: 'en',
  description: '',
});

const Topics = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: topics, isLoading } = useTopics();
  const createMutation = useCreateTopic();
  const updateMutation = useUpdateTopic();
  const deleteMutation = useDeleteTopic();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Topic | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!isAdmin) return null;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (topic: Topic) => {
    setEditing(topic);
    setForm({
      name: topic.name,
      slug: topic.slug,
      locale: topic.locale,
      description: topic.description || '',
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      slug: form.slug,
      locale: form.locale,
      description: form.description || null,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...data });
        toast.success('Topic updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Topic created');
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
      toast.success('Topic deleted');
      setDeleteId(null);
    } catch (err: any) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.topics')}</h1>
          <p className="text-muted-foreground">Manage topics</p>
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
                <TableHead>{t('admin.name')}</TableHead>
                <TableHead>{t('admin.slug')}</TableHead>
                <TableHead>{t('admin.locale')}</TableHead>
                <TableHead>{t('admin.description')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                </TableRow>
              ) : !topics || topics.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                </TableRow>
              ) : (
                topics.map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell className="font-medium">{topic.name}</TableCell>
                    <TableCell className="font-mono text-xs">{topic.slug}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{topic.locale}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{topic.description || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(topic)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(topic.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? t('admin.editTopic') : t('admin.addTopic')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('admin.name')}</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">{t('admin.slug')}</Label>
              <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locale">{t('admin.locale')}</Label>
              <Select value={form.locale} onValueChange={(value) => setForm({ ...form, locale: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="dv">Dhivehi</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('admin.description')}</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
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

export default Topics;
