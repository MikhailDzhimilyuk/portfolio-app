import Image from 'next/image';
import styles from './page.module.scss'
import { prisma } from '../../../../lib/prisma';
import Link from 'next/link';

async function getDataPost( id : string) {
  return await prisma.post.findFirst({
    where: {
      id: Number(id),
    }
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
})  {
  const post = await getDataPost((await params).id);
  return {
    title: post?.title || 'post title',
    description: post?.desc || 'description',
  };
}

const BlogId = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const post = await getDataPost((await params).id);

  return (
      <div className={styles.container}>
        <Link href='/blog' className={styles.backArrow}>←</Link>
        <div className={styles.post}>
          <div className={styles.imageContainer}>
            <Image src={post?.img || '/404.jpg'}
              alt="post image"
              fill={true}
              className={styles.image}
            />
          </div>
          <h1 className={styles.title}>{post?.title}</h1> 
          <span className={styles.content}>{post?.content}</span>
        </div>
      </div>
  )
}

export default BlogId;