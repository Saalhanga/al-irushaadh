import { useState } from 'react';
import { useCollections, useCreateCollection, useUpdateCollection, useDeleteCollection } from '@/hooks/use-collections';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { Collection } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const emptyForm = () => ({
  title: '',
  description: '',
  cover_image: '',
  date_range: '',
  sort_order: 0,
});

const Collections = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: collections, isLoading } = useCollections();
  const createMutation = useCreateCollection();
  const updateMutation = useUpdateCollection();
  const deleteMutation = useDeleteCollection();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!isAdmin) return null;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (collection: Collection) => {
    setEditing(collection);
    setForm({
      title: collection.title,
      description: collection.description || '',
      cover_image: collection.cover_image || '',
      date_range: collection.date_range || '',
      sort_order: collection.sort_order,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: form.title,
      description: form.description || null,
      cover_image: form.cover_image || null,
      date_range: form.date_range || null,
      sort_order: form.sort_order,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...data });
        toast.success('Collection updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Collection created');
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
      toast.success('Collection deleted');
      setDeleteId(null);
    } catch (err: any) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.collections')}</h1>
          <p className="text-muted-foreground">Manage collections</p>
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
                <TableHead>{t('admin.description')}</TableHead>
                <TableHead>{t('admin.itemCount')}</TableHead>
                <TableHead>{t('admin.sortOrder')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                </TableRow>
              ) : !collections || collections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                </TableRow>
              ) : (
                collections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell className="font-medium">{collection.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{collection.description || '-'}</TableCell>
                    <TableCell>{collection.item_count ?? 0}</TableCell>
                    <TableCell>{collection.sort_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(collection)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(collection.id)}>
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
            <DialogTitle>{editing ? t('admin.editCollection') : t('admin.addCollection')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('admin.title')}</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('admin.description')}</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover_image">{t('admin.coverImage')}</Label>
              <Input id="cover_image" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_range">{t('admin.dateRange')}</Label>
              <Input id="date_range" value={form.date_range} onChange={(e) => setForm({ ...form, date_range: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort_order">{t('admin.sortOrder')}</Label>
              <Input id="sort_order" type="number" value={form.sort_order.toString()} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
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

export default Collections;
