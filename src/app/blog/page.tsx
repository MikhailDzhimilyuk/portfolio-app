import Image from 'next/image';
import Link from 'next/link';
import Paginator from '@/components/Paginator/Paginator';
import { prisma } from '../../../lib/prisma';
import styles from './page.module.scss';

export const metadata = {
  title: 'Blog',
  description: 'Blog with all posts of users',
}

export type blogDataType = {
  userId: number,
  id: number,
  title: string,
  body: string
}

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ p: number }>
}) => {
  const postsShown = 5;

  const { p = 1 } = await searchParams;
  const currPageNum = (p < 1) ? 1 : p;

  const allPostsCounter = await prisma.post.count({});
  const skipPosts = allPostsCounter - currPageNum * postsShown;

  const posts = await prisma.post.findMany({
    skip: (skipPosts >= 0) ? skipPosts : 0,
    take: (skipPosts >= 0) ? postsShown : (postsShown + skipPosts >= 0) ? postsShown + skipPosts : 0,
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  })
  return (
    <div className={styles.mainContainer}>
      {
      posts.toReversed().map(post => (

          <Link href={`blog/${post.id}`} className={styles.container} key={`${post.id}`}>
          <div className={styles.imageContainer}>
            <Image 
              src={post.img} 
              alt={post.img}
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.author}>{post.user?.name || "John Doe"}</p>
              <p className={styles.desc}>{post.desc}</p>
          </div>
          </Link>
      ))}
      <Paginator url='blog' elemsShown={postsShown} choosedElem={currPageNum} numOfElems={allPostsCounter}/>
    </div>
  );
};

export default Blog; 