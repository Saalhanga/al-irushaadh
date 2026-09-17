import { useState } from 'react';
import { Copy, Check, QrCode, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ShareMenuProps {
  url: string;
  title: string;
  onClose?: () => void;
}

const ShareMenu = ({ url, title, onClose }: ShareMenuProps) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` },
    { name: 'Telegram', href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'X', href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="w-64 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{t('content.share')}</p>
        {onClose && <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground"><X size={14} /></button>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1.5 rounded border border-border hover:bg-secondary transition-colors text-center"
          >
            {link.name}
          </a>
        ))}
      </div>
      <button onClick={copyLink} className="flex items-center gap-2 w-full text-xs px-2 py-1.5 rounded border border-border hover:bg-secondary transition-colors">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <div className="flex items-center gap-2 w-full text-xs px-2 py-1.5 rounded border border-border hover:bg-secondary transition-colors cursor-pointer">
        <QrCode size={14} />
        QR Code
      </div>
    </div>
  );
};

export default ShareMenu;
