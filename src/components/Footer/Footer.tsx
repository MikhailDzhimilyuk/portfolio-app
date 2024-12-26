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

    interface ILink {
        url: string, 
        src: string, 
        alt: string
    }

    const links : ILink[] = [
        {
            url: `http://vk.com/share.php?url=${fullPath}`,
            src:'/vk.svg',
            alt:'vk.com',
        },
        {
            url: `https://telegram.me/share/url?url=${fullPath}&text=Portfolio App`,
            src:'/telegram.svg',
            alt: 'telegram.com',
        },
        {
            url:`https://reddit.com/submit?url=${fullPath}&title=Portfolio App`,
            src:'/reddit.svg',
            alt:'reddit.com',
        },
        {
            url:`http://instagram.com/${fullPath}?ref=badge`,
            src:'/instagram.svg',
            alt:'instagram.com',
        },
        {
            url:`http://www.twitter.com/share?url=${fullPath}`,
            src:'/twitter.svg',
            alt:'twitter.com',
        },
    ];

    return (    
        <footer className={styles.container}>
            <div>
                2054 Portfolio App. All rights reserved
            </div>
            <div className={styles.social}>
                {links.map((link, index) =>
                    <ImageLink
                        key={index}
                        url={link.url}
                        src={link.src}
                        alt={link.alt}
                        classNameLink={styles.iconLink}
                    />
                )}
            </div>
        </footer>
    );
};

export default Footer;