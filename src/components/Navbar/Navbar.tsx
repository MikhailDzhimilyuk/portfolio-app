'use client'

import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import styles from './navbar.module.scss';
import { signOut, useSession } from 'next-auth/react';
import Button from '../Button/Button';

type linkType = {
    id: number,
    title: string,
    url: string
}

const links : linkType[] = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Portfolio",
        url: "/portfolio",
    },
    {
        id: 3,
        title: "About",
        url: "/about",
    },
    {
        id: 4,
        title: "Blog",
        url: "/blog",
    },
    {
        id: 5,
        title: "Contact",
        url: "/contact",
    },
    {
        id: 6,
        title: "Dashboard",
        url: "/dashboard",
    },
];

const Navbar = () => {
    const session = useSession();

    return (
        <nav className={styles.container}>
            <Link href='/' className={styles.logo}>Portfolio App</Link>
            <div className={styles.right}>
                <DarkModeToggle />
                <div className={styles.links}>
                    {links.map(link => 
                        <Link  key={link.id} href={link.url} title={link.title} className={styles.link} >
                            {link.title}
                        </Link>
                    )}
                </div>
                {(session.status == 'authenticated' && 
                    <button className={styles.signout} onClick={() => signOut()}>Logout</button>) || 
                (session.status == 'unauthenticated' && 
                    <Button className={styles.signin} url='/dashboard/login' text='Sign in' />
                )}
            </div>
        </nav>
    );
};

export default Navbar;