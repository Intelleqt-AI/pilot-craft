import { getMediaUrl } from '@/lib/media';
import React from 'react';

export function Testimonial({ quote, author, role, avatar }) {
  const avatarUrl = avatar ? getMediaUrl(avatar) : null;

  return (
    <div className={styles.testimonial}>
      <div className={styles.testimonialContent}>
        <p className={styles.testimonialQuote}>{quote}</p>
        <div className={styles.testimonialAuthor}>
          {avatarUrl && (
            <div className={styles.testimonialAvatar}>
              <img src={avatarUrl} alt={author} width={50} height={50} style={{ objectFit: 'cover' }} />
            </div>
          )}
          <div>
            <p className={styles.testimonialName}>{author}</p>
            {role && <p className={styles.testimonialRole}>{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
