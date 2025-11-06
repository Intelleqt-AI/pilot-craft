import React from 'react';

export function Video({ url, caption }) {
  // Handle YouTube, Vimeo, or other video sources
  const embedUrl = getEmbedUrl(url);

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <iframe
          src={embedUrl}
          title={caption || 'Video'}
          allowFullScreen
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      {caption && <p className={styles.videoCaption}>{caption}</p>}
    </div>
  );
}

// Helper function for Video component
function getEmbedUrl(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract YouTube ID
    const id = url.includes('youtube.com/watch?v=')
      ? url.split('v=')[1].split('&')[0]
      : url.includes('youtu.be/')
      ? url.split('youtu.be/')[1].split('?')[0]
      : '';
    return `https://www.youtube.com/embed/${id}`;
  } else if (url.includes('vimeo.com')) {
    // Extract Vimeo ID
    const id = url.split('vimeo.com/')[1].split('?')[0];
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}
