import { useState } from 'react';
import { useSheikhs, useCreateSheikh, useUpdateSheikh, useDeleteSheikh } from '@/hooks/use-sheikhs';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import type { Sheikh } from '@/lib/types';
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
  photo_url: '',
  short_bio: '',
  languages: '',
  topics: '',
  visibility: 'visible' as 'visible' | 'hidden',
});

const Sheikhs = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: sheikhs, isLoading } = useSheikhs();
  const createMutation = useCreateSheikh();
  const updateMutation = useUpdateSheikh();
  const deleteMutation = useDeleteSheikh();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sheikh | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!isAdmin) return null;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (sheikh: Sheikh) => {
    setEditing(sheikh);
    setForm({
      name: sheikh.name,
      photo_url: sheikh.photo_url || '',
      short_bio: sheikh.short_bio,
      languages: sheikh.languages.join(', '),
      topics: sheikh.topics.join(', '),
      visibility: sheikh.visibility,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      photo_url: form.photo_url || null,
      short_bio: form.short_bio,
      languages: form.languages.split(',').map((s) => s.trim()).filter(Boolean),
      topics: form.topics.split(',').map((s) => s.trim()).filter(Boolean),
      visibility: form.visibility,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...data });
        toast.success('Sheikh updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Sheikh created');
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
      toast.success('Sheikh deleted');
      setDeleteId(null);
    } catch (err: any) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.sheikhs')}</h1>
          <p className="text-muted-foreground">Manage sheikhs</p>
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
                <TableHead>{t('admin.shortBio')}</TableHead>
                <TableHead>{t('admin.visibility')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">Loading...</TableCell>
                </TableRow>
              ) : !sheikhs || sheikhs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">{t('admin.noData')}</TableCell>
                </TableRow>
              ) : (
                sheikhs.map((sheikh) => (
                  <TableRow key={sheikh.id}>
                    <TableCell className="font-medium">{sheikh.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{sheikh.short_bio}</TableCell>
                    <TableCell>
                      <Badge variant={sheikh.visibility === 'visible' ? 'default' : 'secondary'}>
                        {sheikh.visibility}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(sheikh)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(sheikh.id)}>
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? t('admin.editSheikh') : t('admin.addSheikh')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('admin.name')}</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo_url">{t('admin.photoUrl')}</Label>
              <Input id="photo_url" value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_bio">{t('admin.shortBio')}</Label>
              <Textarea id="short_bio" value={form.short_bio} onChange={(e) => setForm({ ...form, short_bio: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">{t('admin.languages')} ({t('admin.commaSeparated')})</Label>
              <Input id="languages" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topics">{t('admin.topics')} ({t('admin.commaSeparated')})</Label>
              <Input id="topics" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">{t('admin.visibility')}</Label>
              <Select value={form.visibility} onValueChange={(value: 'visible' | 'hidden') => setForm({ ...form, visibility: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visible">{t('admin.visible')}</SelectItem>
                  <SelectItem value="hidden">{t('admin.hidden')}</SelectItem>
                </SelectContent>
              </Select>
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

export default Sheikhs;
