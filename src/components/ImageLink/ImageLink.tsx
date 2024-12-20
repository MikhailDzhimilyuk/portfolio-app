import Image from 'next/image';
import Link from 'next/link';

type propsLinkType = {
  url: string,
  src: string,
  alt: string,
  width: number,
  height: number,
  className: string,
}
const ImageLink = ({url, src, alt, width, height, className} : propsLinkType) => {
  return (
    <Link href={url}>
      <Image src={src} width={width} height={height} className={className} alt={alt}/>
    </Link>
  );
};

export default ImageLink;