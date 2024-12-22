import Image from 'next/image';
import Button from '@/components/Button/Button';
import { getData } from '../../../../lib/json';
import styles from './page.module.scss';

interface ICategoryInfo {
    [key: string]: {
        title: string,
        descPage: string,
        info: { imageURL: string, titleInfo: string, desc: string, buttonURL?: string, buttonText?: string, }[],
    },
}

export async function generateMetadata({
    params,
  }: {
    params: Promise<{category: string}>
  })  {
    const { category } = await params;
    const categoryInfo : ICategoryInfo = (await getData()).categoryInfo;
  return {
    title: categoryInfo[category].title || 'category',
    description: categoryInfo[category].descPage || 'category description',
  };
}


const Category = async ({
    params,
  }: {
    params: Promise<{category: string}>
  }) => {
    const { category } = await params;
    const categoryInfo : ICategoryInfo = (await getData()).categoryInfo;
    return (
        <div className={styles.container}>
            <h1 className={styles.catTitle}>{categoryInfo[category].title}</h1>

            {categoryInfo[category].info.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{categoryInfo[category].info[index].titleInfo}</h1>
                        <p className={styles.desc}>{categoryInfo[category].info[index].desc}</p>
                        {categoryInfo[category].info[index]?.buttonURL && 
                            <Button 
                                text={categoryInfo[category].info[index]?.buttonText || "See More"} 
                                url={categoryInfo[category].info[index].buttonURL as string} 
                            />
                        }
                    </div>
                    <div className={styles.imgContainer}>
                        <Image
                        className={styles.img}
                        fill={true}
                        src={categoryInfo[category].info[index].imageURL}
                        alt={categoryInfo[category].info[index].titleInfo + ' image'}
                        />
                    </div>
                </div>
            ))} 
        </div>
    );
};

export default Category;