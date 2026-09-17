import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Volume2, Download, Share2, ListMusic, X } from 'lucide-react';
import { formatDuration, cn } from '@/lib/utils';
import ShareMenu from './ShareMenu';

interface Track {
  id: string;
  title: string;
  sheikh?: string;
  audioUrl: string;
  filePath?: string;
}

interface PersistentPlayerProps {
  queue?: Track[];
  currentTrack?: Track | null;
  onTrackChange?: (track: Track) => void;
}

const PersistentPlayer = ({ queue = [], currentTrack, onTrackChange }: PersistentPlayerProps) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showQueue, setShowQueue] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (queue.length > 0 && currentTrack) {
        const idx = queue.findIndex(t => t.id === currentTrack.id);
        if (idx < queue.length - 1) {
          onTrackChange?.(queue[idx + 1]);
        } else {
          setIsPlaying(false);
        }
      }
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, currentTrack, onTrackChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  if (!currentTrack) return null;

  const handleRewind = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleForward = () => {
    if (audioRef.current && duration) audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handlePrev = () => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) onTrackChange?.(queue[idx - 1]);
  };

  const handleNext = () => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    if (idx < queue.length - 1) onTrackChange?.(queue[idx + 1]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-20">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{currentTrack.title}</p>
            {currentTrack.sheikh && <p className="text-xs text-muted-foreground truncate">{currentTrack.sheikh}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.previous')}>
              <SkipBack size={18} />
            </button>
            <button onClick={handleRewind} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.rewind')}>
              <Rewind size={18} />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" aria-label={isPlaying ? t('player.pause') : t('player.play')}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={handleForward} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.forward')}>
              <FastForward size={18} />
            </button>
            <button onClick={handleNext} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.next')}>
              <SkipForward size={18} />
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-3 flex-1 justify-end">
            <span className="text-xs text-muted-foreground">{formatDuration(Math.floor(progress))} / {formatDuration(Math.floor(duration))}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              className="w-32 accent-primary"
              aria-label="Progress"
            />
            <div className="flex items-center gap-1">
              <Volume2 size={16} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
                }}
                className="w-20 accent-primary"
                aria-label={t('player.volume')}
              />
            </div>
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="text-xs bg-secondary border border-border rounded px-1 py-1"
              aria-label={t('player.speed')}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            {currentTrack.filePath && (
              <a href={currentTrack.audioUrl} download className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.download')}>
                <Download size={18} />
              </a>
            )}
            <button onClick={() => setShowShare(!showShare)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.share')}>
              <Share2 size={18} />
            </button>
            <button onClick={() => setShowQueue(!showQueue)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('player.queue')}>
              <ListMusic size={18} />
            </button>
          </div>
        </div>
      </div>
      {showQueue && (
        <div className="absolute bottom-full left-0 right-0 bg-background border-t border-border shadow-lg max-h-64 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <p className="text-sm font-medium">{t('player.queue')}</p>
            <button onClick={() => setShowQueue(false)} className="p-1 text-muted-foreground hover:text-foreground"><X size={16} /></button>
          </div>
          {queue.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => onTrackChange?.(track)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${track.id === currentTrack.id ? 'bg-primary/10 text-primary font-medium' : ''}`}
            >
              {idx + 1}. {track.title} {track.sheikh ? `— ${track.sheikh}` : ''}
            </button>
          ))}
        </div>
      )}
      {showShare && (
        <div className="absolute bottom-full right-4 bg-background border border-border rounded-lg shadow-lg p-2">
          <ShareMenu url={window.location.href} title={currentTrack.title} onClose={() => setShowShare(false)} />
        </div>
      )}
    </div>
  );
};

export default PersistentPlayer;
