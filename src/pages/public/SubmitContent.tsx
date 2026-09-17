import { useState } from 'react';
import { useCreateSubmission } from '@/hooks/use-collections';
import { useSheikhs } from '@/hooks/use-sheikhs';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const CONTENT_TYPES = [
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'article', label: 'Article' },
  { value: 'pdf', label: 'PDF' },
  { value: 'image', label: 'Image' },
  { value: 'qna', label: 'Q&A' },
  { value: 'quran', label: 'Quran / Tafsir' },
  { value: 'dua', label: 'Dua / Adhkar' },
  { value: 'interview', label: 'Interview' },
  { value: 'discussion', label: 'Discussion' },
  { value: 'short_clip', label: 'Short Clip' },
  { value: 'lecture_series', label: 'Lecture Series' },
  { value: 'course', label: 'Course' },
];

const SubmitContent = () => {
  const { t } = useLanguage();
  const createSubmission = useCreateSubmission();
  const { data: sheikhs } = useSheikhs({ visibility: 'visible' });

  const [formData, setFormData] = useState({
    url: '',
    sheikh_id: '',
    type: 'audio',
    title: '',
    date: '',
    event: '',
    location: '',
    description: '',
    contact_email: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubmission.mutateAsync({
        ...formData,
        sheikh_id: formData.sheikh_id || null,
        state: 'needs_review',
      });
      setSubmitted(true);
      toast.success(t('submission.success'));
    } catch {
      toast.error(t('common.error'));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('submission.success')}</h2>
          <p className="text-muted-foreground mb-6">Thank you for your submission. Our team will review it shortly.</p>
          <Button asChild>
            <a href="/">{t('nav.home')}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('submission.title')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">{t('submission.url')}</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sheikh">{t('submission.sheikh')}</Label>
            <Select value={formData.sheikh_id} onValueChange={(value) => setFormData({ ...formData, sheikh_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('submission.selectSheikh')} />
              </SelectTrigger>
              <SelectContent>
                {sheikhs?.map((sheikh) => (
                  <SelectItem key={sheikh.id} value={sheikh.id}>{sheikh.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">{t('submission.type')}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_TYPES.map((ct) => (
                  <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">{t('submission.titleField')}</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">{t('submission.date')}</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event">{t('submission.event')}</Label>
            <Input
              id="event"
              type="text"
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t('submission.location')}</Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('submission.description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email">{t('submission.contact')}</Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('submission.notes')}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={createSubmission.isPending}>
            {createSubmission.isPending ? t('common.loading') : t('submission.submit')}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default SubmitContent;
