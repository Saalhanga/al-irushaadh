import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import type { Topic } from '@/lib/types';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const { locale } = useLanguage();

  return (
    <Link to={`/topics/${topic.id}`} className="group block">
      <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200 text-center">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {locale === 'ar' ? topic.name : topic.name}
        </h3>
        {topic.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{topic.description}</p>}
      </div>
    </Link>
  );
};

export default TopicCard;
