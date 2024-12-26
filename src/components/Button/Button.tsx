import Link from 'next/link';
import styles from './button.module.scss';

interface IPropsBtn {
    text: string,
    url: string,
    className?: string,
    padding?: number,
}

const Button = ({text, url, className, padding} : IPropsBtn) => {
    return (
        <div>
            <Link href={url}>
                <button className={className || styles.container} style={{padding: `${padding}px`}}>
                    {text}
                </button>
            </Link>
        </div>
    );
};

export default Button;