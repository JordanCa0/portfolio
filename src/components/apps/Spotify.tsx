import { SPOTIFY_EMBED_URL } from '../../apps';

export default function Spotify() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <iframe
        title="Spotify player"
        src={SPOTIFY_EMBED_URL}
        className="min-h-0 w-full flex-1 rounded-xl border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
      <p className="shrink-0 text-center text-[11px] text-body-muted">
        Now spinning on jordan@portfolio — log in to Spotify for full tracks.
      </p>
    </div>
  );
}
