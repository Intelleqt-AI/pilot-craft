import { getMediaUrl } from '@/lib/media';
import React from 'react';

export function ImageBlock({ image }) {
  const imageUrl = getMediaUrl(image);

  if (!imageUrl) return null;

  return (
    <figure className={styles.imageBlock}>
      <div className="">
        <img
          className="mb-10 mx-auto"
          src={imageUrl}
          alt={image.data?.attributes?.alternativeText || ''}
          width={image.data?.attributes?.width || 800}
          height={image.data?.attributes?.height || 500}
          style={{ objectFit: 'cover' }}
        />
      </div>
      {image.data?.attributes?.caption && <figcaption className={styles.caption}>{image.data.attributes.caption}</figcaption>}
    </figure>
  );
}
