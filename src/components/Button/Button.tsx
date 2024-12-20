import Link from 'next/link';
import styles from './button.module.scss';

interface IPropsBtn {
    text: string,
    url: string,
    className?: string,
}

const Button = ({text, url, className} : IPropsBtn) => {
    return (
        <div>
            <Link href={url}>
                <button className={className || styles.container}>
                    {text}
                </button>
            </Link>
        </div>
    );
};

export default Button;