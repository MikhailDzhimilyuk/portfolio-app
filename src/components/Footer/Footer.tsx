'use client'
import ImageLink from '../ImageLink/ImageLink';
import { useEffect, useState } from 'react';
import styles from './footer.module.scss';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const [fullPath, SetFullPath] = useState<string>();
    const pathName = usePathname();

    useEffect(() => {
        SetFullPath(window.location.origin + pathName);
    }, [])

    return (    
        <footer className={styles.container}>
            <div>
                2054 Portfolio App. All rights reserved
            </div>
            <div className={styles.social}>
                <ImageLink
                    url={`http://vk.com/share.php?url=${fullPath}`}
                    src='/vk.svg'
                    alt='vk.com'
                    width={34}
                    height={34}
                    className={styles.icon}
                />
                <ImageLink 
                    url={`https://telegram.me/share/url?url=${fullPath}&text=Portfolio App`}
                    src='/telegram.svg'
                    alt='telegram.com'
                    width={34}
                    height={34}
                    className={styles.icon}
                />
                <ImageLink 
                    url={`https://reddit.com/submit?url=${fullPath}&title=Portfolio App`}
                    src='/reddit.svg'
                    alt='reddit.com'
                    width={34}
                    height={34}
                    className={styles.icon}
                />
                <ImageLink 
                    url={`http://instagram.com/${fullPath}?ref=badge`}
                    src='/instagram.svg'
                    alt='instagram.com'
                    width={34}
                    height={34}
                    className={styles.icon}
                />
                <ImageLink 
                    url={`http://www.twitter.com/share?url=${fullPath}`}
                    src='/twitter.svg'
                    alt='twitter.com'
                    width={34}
                    height={34}
                    className={styles.icon}
                />
            </div>
        </footer>
    );
};

export default Footer;