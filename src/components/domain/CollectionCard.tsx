import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatDate, cn } from '@/lib/utils';
import type { Collection } from '@/lib/types';

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { t } = useLanguage();

  return (
    <Link to={`/collections/${collection.id}`} className="group block">
      <div className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        <div className="aspect-video bg-secondary flex items-center justify-center">
          {collection.cover_image ? (
            <img src={collection.cover_image} alt={collection.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-muted-foreground">📚</span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{collection.title}</h3>
          {collection.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">{collection.description}</p>}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">{collection.item_count || 0} items</span>
            {collection.date_range && <span className="text-xs text-muted-foreground">{collection.date_range}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
