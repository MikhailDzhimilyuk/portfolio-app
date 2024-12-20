import Image from 'next/image';
import Button from '@/components/Button/Button';
import styles from './page.module.scss';

export const metadata = {
    title: 'Contact',
    description: 'Contact me to discuss the vacancy',
}

const Contact = () => {
    return (
        <div className={styles.container}>
           <h1 className={styles.title}>
             Contact me by email or phone, indicated on hh.ru, 
             the form here is just for show)
            </h1>
           <div className={styles.content}>
                <div className={styles.imgContainer}>
                    <Image src='/contact.jpg' alt ='contact' fill={true}/>
                </div>
                <form className={styles.form}>
                    <input type='text' placeholder='name' className={styles.input} />
                    <input type='text' placeholder='email' className={styles.input} />
                    <textarea 
                    name='' 
                    id='' 
                    cols={30} 
                    rows={10}
                    className={styles.textArea}
                    placeholder='message'
                    ></textarea>
                    <Button url='#' text='Send'/>
                </form>
           </div>
        </div>
    );
};

export default Contact;