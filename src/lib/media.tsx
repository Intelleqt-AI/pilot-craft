export function getMediaUrl(media) {
  if (!media || !media.data) return null;

  const { url } = media.data.attributes;
  return url.startsWith('http') ? url : `https://reassuring-paradise-02bc2fb070.strapiapp.com/${url}`;
}

// components/blocks/RichText.js
import React from 'react';

export function RichText({ content }) {
  return <div className={styles.richText} dangerouslySetInnerHTML={{ __html: content }} />;
}
