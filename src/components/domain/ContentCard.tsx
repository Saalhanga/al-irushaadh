import { Link } from 'react-router-dom';
import { Play, FileText, Image as ImageIcon, FileQuestion, BookOpen, MessageCircle, Mic, Video, Film, GraduationCap, FolderOpen } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatDuration, formatDate, getContentTypeLabel, cn } from '@/lib/utils';
import type { Content } from '@/lib/types';
import ShareMenu from '@/components/ShareMenu';

interface ContentCardProps {
  content: Content;
  variant?: 'default' | 'audio' | 'video' | 'article' | 'pdf' | 'image' | 'qna';
}

const ContentCard = ({ content, variant = 'default' }: ContentCardProps) => {
  const { t, locale } = useLanguage();

  const getIcon = () => {
    switch (content.type) {
      case 'audio': return <Mic className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'article': return <FileText className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'image': return <ImageIcon className="w-5 h-5" />;
      case 'qna': return <FileQuestion className="w-5 h-5" />;
      case 'quran': return <BookOpen className="w-5 h-5" />;
      case 'dua': return <MessageCircle className="w-5 h-5" />;
      case 'interview': return <MessageCircle className="w-5 h-5" />;
      case 'discussion': return <MessageCircle className="w-5 h-5" />;
      case 'short_clip': return <Film className="w-5 h-5" />;
      case 'lecture_series': return <GraduationCap className="w-5 h-5" />;
      case 'course': return <GraduationCap className="w-5 h-5" />;
      case 'collection': return <FolderOpen className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <Link to={`/${content.type}/${content.id}`} className="group block">
      <div className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        {variant === 'audio' && content.file_path && (
          <div className="p-4 bg-secondary/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Play size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{content.title}</p>
              {content.duration && <p className="text-xs text-muted-foreground">{formatDuration(content.duration)}</p>}
            </div>
          </div>
        )}
        {variant === 'video' && (
          <div className="relative aspect-video bg-secondary">
            {content.file_path ? (
              <video src={content.file_path} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Video size={40} />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary">
                <Play size={24} />
              </div>
            </div>
          </div>
        )}
        {variant === 'article' && (
          <div className="p-4 bg-secondary/30 flex items-start gap-3">
            <div className="text-primary mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2">{content.title}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{content.description}</p>
            </div>
          </div>
        )}
        {variant === 'pdf' && (
          <div className="p-4 bg-secondary/30 flex items-center gap-3">
            <div className="text-primary">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{content.title}</p>
              {content.page_count && <p className="text-xs text-muted-foreground">{content.page_count} pages</p>}
            </div>
          </div>
        )}
        {variant === 'image' && (
          <div className="aspect-video bg-secondary flex items-center justify-center">
            {content.file_path ? (
              <img src={content.file_path} alt={content.title} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={40} className="text-muted-foreground" />
            )}
          </div>
        )}
        {variant === 'qna' && (
          <div className="p-4 bg-secondary/30">
            <p className="text-sm font-medium line-clamp-2">{content.title}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{content.description}</p>
          </div>
        )}
        {variant === 'default' && (
          <div className="p-4 bg-secondary/30 flex items-center gap-3">
            <div className="text-primary">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{content.title}</p>
              <p className="text-xs text-muted-foreground truncate">{getContentTypeLabel(content.type, locale)}</p>
            </div>
          </div>
        )}
        <div className="p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{formatDate(content.date || content.added_at)}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{getContentTypeLabel(content.type, locale)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
