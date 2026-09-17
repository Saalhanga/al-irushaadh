import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatDate, cn } from '@/lib/utils';
import type { Sheikh } from '@/lib/types';

interface SheikhCardProps {
  sheikh: Sheikh;
}

const SheikhCard = ({ sheikh }: SheikhCardProps) => {
  const { t } = useLanguage();

  return (
    <Link to={`/sheikhs/${sheikh.id}`} className="group block">
      <div className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col items-center text-center p-6">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4 overflow-hidden">
          {sheikh.photo_url ? (
            <img src={sheikh.photo_url} alt={sheikh.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl text-muted-foreground">{sheikh.name.charAt(0)}</span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{sheikh.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{sheikh.short_bio}</p>
        <div className="flex flex-wrap gap-1 mt-3 justify-center">
          {sheikh.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{topic}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SheikhCard;
