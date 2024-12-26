import Button from '@/components/Button/Button';
import Image from 'next/image';
import Hero from '../../public/hero.jpg';
import styles from './page.module.scss';

export const metadata = {
  title: 'Home',
  description: 'The Future is Nextjs Framework',
}

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        The Future is Nextjs Framework
      </h1>
      <div className={styles.descContainer}>
        <p className={styles.desc}>
          By mastering useful technologies we open the way to new opportunities
        </p>
        <Button url='/portfolio' text='See More' padding={15}/>
      </div>
      <div className={styles.imgContainer}>
        <Image src={Hero} alt='main photo' className={styles.img}/>
      </div>
    </main>
  );
}
