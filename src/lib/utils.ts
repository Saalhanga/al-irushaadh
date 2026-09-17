import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getContentTypeLabel(type: string, locale: string = 'en'): string {
  const labels: Record<string, Record<string, string>> = {
    en: {
      audio: 'Audio',
      video: 'Video',
      article: 'Article',
      pdf: 'PDF',
      image: 'Image',
      qna: 'Q&A',
      quran: 'Quran / Tafsir',
      dua: 'Dua / Adhkar',
      interview: 'Interview',
      discussion: 'Discussion',
      short_clip: 'Short Clip',
      lecture_series: 'Lecture Series',
      course: 'Course',
      collection: 'Collection',
    },
    dv: {
      audio: 'އޯޑިއޯ',
      video: 'ވިޑިއޯ',
      article: 'ލިޔުން',
      pdf: 'ޕީޑީއެފް',
      image: 'ފޮޓޯ',
      qna: 'ސުލާލު',
      quran: 'ކީރުން / ތެރެސީރު',
      dua: 'ދުއްތި / ޢިދްކާރު',
      interview: 'އިތާރާތު',
      discussion: 'މަސަލައްޙާ',
      short_clip: 'ކުރުމަތް',
      lecture_series: 'ލެކްޝަރ',
      course: 'ކޯސް',
      collection: 'ކުޅަނޑަންތައް',
    },
    ar: {
      audio: 'صوتي',
      video: 'فيديو',
      article: 'مقال',
      pdf: 'PDF',
      image: 'صورة',
      qna: 'سؤال وجواب',
      quran: 'قرآن / تفسير',
      dua: 'دعاء / أذكار',
      interview: 'مقابلة',
      discussion: 'نقاش',
      short_clip: 'مقطع قصير',
      lecture_series: 'سلسلة محاضرات',
      course: 'دورة',
      collection: 'مجموعة',
    },
  };

  return labels[locale]?.[type] || labels.en[type] || type;
}
