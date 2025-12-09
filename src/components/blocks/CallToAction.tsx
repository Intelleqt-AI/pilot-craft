import React from 'react';
import { Link } from 'react-router-dom';

export function CallToAction({ title, text, buttonText, buttonLink, variant = 'primary' }) {
  return (
    <div className={`${styles.cta} ${styles[`cta${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
      {title && <h3 className={styles.ctaTitle}>{title}</h3>}
      {text && <p className={styles.ctaText}>{text}</p>}
      {buttonText && buttonLink && (
        <Link to={buttonLink}>
          <a className={styles.ctaButton}>{buttonText}</a>
        </Link>
      )}
    </div>
  );
}
