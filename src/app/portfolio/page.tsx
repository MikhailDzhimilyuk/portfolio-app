import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
    title: 'Portfolio',
    description: 'Check my skills, qualities and motivation',
}

const Portfolio = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.selectTitle}>My advantages</h1>
            <div className={styles.items}>
                <Link href='portfolio/personalqualities' className={styles.item}>
                    <span className={styles.title}>Personal qualities</span>
                </Link>
                <Link href='portfolio/professionalskills' className={styles.item}>
                    <span className={styles.title}>Professional skills</span>
                </Link>
                <Link href='portfolio/motivation' className={styles.item}>
                    <span className={styles.title}>Motivation</span>
                </Link>
            </div>
        </div>
    );
};

export default Portfolio;