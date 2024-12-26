import Image from 'next/image';
import Button from '@/components/Button/Button';
import PeopleOnGrass from '../../../public/people_on_grass.jpg';
import styles from './page.module.scss';

export const metadata = {
    title: 'About',
    description: 'About this web application',
}

const About = () => {
    return (
        <div className={styles.container}>
           <div className={styles.imgContainer}>
                <Image src={PeopleOnGrass} alt='people on grass' fill={true} className={styles.img}/>
                <div className={styles.imgText}>
                    <h1 className={styles.imgTitle}>
                        About this web application
                    </h1>
                    <h2 className={styles.imgDesc}>
                    I am looking for a job as a programmer. This site serves as a small example showing my skills
                    </h2>
                </div>
           </div>
           <div className={styles.textContainer}>
                <div className={styles.item}>
                    <h2 className={styles.title}>
                        Reasons to make this app
                    </h2>
                    <p className={styles.desc}>
                        Firstly, I needed to make an app to show my skills to the employer. <br/><br/>
                        Secondly, during this project, I became more familiar with the backend.
                        For example, this app works with the PostgreSQL database. <br/><br/>
                        Thirdly, it is always important to develop your skills: practice and more practice! <br/><br/>
                        Fourthly, I implemented several authentication methods and authorization, which is useful in any application. <br/><br/>
                        Fifth, it was interesting.
                        <br/>
                        <br/>
                        <br/>
                        For these reasons I created this application.
                    </p>
                </div>

                <div className={styles.item}>
                    <h2 className={styles.title}>What did I want to show the employer?</h2>
                    <p className={styles.desc}>
                    First, to demonstrate my capabilities that will be useful to you. <br/><br/>
                    Second, to show that I am able to learn and improve. <br/><br/>
                    Third, to show my motivation and interest in the work. <br/><br/>
                    Fourth, that I am ready to accept the offer (don't be shy).
                    </p>
                    <Button text='Contact' url='/contact' className={styles.btn} padding={10}/>
                </div>

           </div>
        </div>
    );
};

export default About;