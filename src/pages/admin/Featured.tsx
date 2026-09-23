import { useState } from 'react';
import { useFeaturedItems, useCreateFeaturedItem, useUpdateFeaturedItem, useDeleteFeaturedItem } from '@/hooks/use-collections';
import { useContent } from '@/hooks/use-content';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { FeaturedItem, Content } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const emptyForm = () => ({
  content_id: '',
  slot: 'primary' as FeaturedItem['slot'],
  sort_order: 0,
  enabled: true,
});

const Featured = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: featuredItems, isLoading } = useFeaturedItems();
  const { data: content } = useContent();
  const createMutation = useCreateFeaturedItem();
  const updateMutation = useUpdateFeaturedItem();
  const deleteMutation = useDeleteFeaturedItem();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FeaturedItem | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!isAdmin) return null;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (item: FeaturedItem) => {
    setEditing(item);
    setForm({
      content_id: item.content_id,
      slot: item.slot,
      sort_order: item.sort_order,
      enabled: item.enabled,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      content_id: form.content_id,
      slot: form.slot,
      sort_order: form.sort_order,
      enabled: form.enabled,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...data });
        toast.success('Featured item updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Featured item created');
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
      toast.success('Featured item deleted');
      setDeleteId(null);
    } catch (err: any) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const contentMap = content?.reduce((acc, c) => { acc[c.id] = c; return acc; }, {} as Record<string, Content>) || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.featured')}</h1>
          <p className="text-muted-foreground">Manage featured content</p>
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
                <TableHead>{t('admin.contentManagement')}</TableHead>
                <TableHead>{t('admin.slot')}</TableHead>
                <TableHead>{t('admin.sortOrder')}</TableHead>
                <TableHead>{t('admin.enabled')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                </TableRow>
              ) : !featuredItems || featuredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                </TableRow>
              ) : (
                featuredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {contentMap[item.content_id]?.title || `Content #${item.content_id.slice(0, 8)}`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.slot === 'primary' ? 'default' : 'secondary'}>{item.slot}</Badge>
                    </TableCell>
                    <TableCell>{item.sort_order}</TableCell>
                    <TableCell>
                      <Badge variant={item.enabled ? 'default' : 'secondary'}>{item.enabled ? 'Yes' : 'No'}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item as FeaturedItem)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? t('admin.editFeatured') : t('admin.addFeatured')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content_id">{t('admin.contentManagement')}</Label>
              <Select value={form.content_id} onValueChange={(value) => setForm({ ...form, content_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('admin.selectContent')} />
                </SelectTrigger>
                <SelectContent>
                  {content?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slot">{t('admin.slot')}</Label>
              <Select value={form.slot} onValueChange={(value: FeaturedItem['slot']) => setForm({ ...form, slot: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">{t('admin.primary')}</SelectItem>
                  <SelectItem value="supporting">{t('admin.supporting')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort_order">{t('admin.sortOrder')}</Label>
              <Input id="sort_order" type="number" value={form.sort_order.toString()} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="enabled"
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="enabled">{t('admin.enabled')}</Label>
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

export default Featured;
