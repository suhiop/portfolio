import styles from './Footer.module.css';

export default function Footer() {
  const marqueeText = '클릭하고 드래그하여 작업을 확인하세요 • SCROLL AND EXPLORE OUR WORK • ';

  return (
    <footer className="mt-20">
      {/* Marquee Section */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {/* Render twice for seamless loop */}
          {[1, 2].map((i) => (
            <div key={i} className={styles.marqueeItem}>
              {marqueeText}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className={styles.contactInfo}>
        <a
          href="mailto:contact@graphii-graphy.com"
          className={styles.contactEmail}
        >
          contact@graphii-graphy.com
        </a>
        <p className="text-sm text-text-secondary mt-4">
          © {new Date().getFullYear()} GRAPHII—GRAPHY Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
