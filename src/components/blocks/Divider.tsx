export function Divider({ style = 'solid' }) {
  return <hr className={`${styles.divider} ${styles[`divider${style.charAt(0).toUpperCase() + style.slice(1)}`]}`} />;
}
