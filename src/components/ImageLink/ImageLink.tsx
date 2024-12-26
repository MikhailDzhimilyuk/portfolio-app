import Image from 'next/image';
import Link from 'next/link';

type propsLinkType = {
  url: string,
  src: string,
  alt: string,
  classNameLink: string,
  classNameImg?: string,
}
const ImageLink = ({url, src, alt, classNameLink, classNameImg} : propsLinkType) => {
  return (
    <Link href={url} className={classNameLink}>
      <Image 
        src={src}
        fill={true}
        className={classNameImg} 
        alt={alt}
      />
    </Link>
  );
};

export default ImageLink;