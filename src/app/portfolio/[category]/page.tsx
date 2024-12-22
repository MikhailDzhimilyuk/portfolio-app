import Image from 'next/image';
import Button from '@/components/Button/Button';
import { getData } from '../../../../lib/json';
import styles from './page.module.scss';

interface IParams {
    params: {
        category: string
    }
}

interface ICategoryInfo {
    [key: string]: {
        title: string,
        info: { imageURL: string, titleInfo: string, desc: string, buttonURL?: string, buttonText?: string, }[],
    },
}

export async function generateMetadata()  {
    const categoryInfo : ICategoryInfo = (await getData()).categoryInfo;
  return {
    title: categoryInfo.title || 'category',
    description: categoryInfo.desc || 'category description',
  };
}


const Category = async ({params} : IParams) => {
    const categoryInfo : ICategoryInfo = (await getData()).categoryInfo;

    return (
        <div className={styles.container}>
            <h1 className={styles.catTitle}>{categoryInfo[params.category].title}</h1>

            {categoryInfo[params.category].info.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{categoryInfo[params.category].info[index].titleInfo}</h1>
                        <p className={styles.desc}>{categoryInfo[params.category].info[index].desc}</p>
                        {categoryInfo[params.category].info[index]?.buttonURL && 
                            <Button 
                                text={categoryInfo[params.category].info[index]?.buttonText || "See More"} 
                                url={categoryInfo[params.category].info[index].buttonURL as string} 
                            />
                        }
                    </div>
                    <div className={styles.imgContainer}>
                        <Image
                        className={styles.img}
                        fill={true}
                        src={categoryInfo[params.category].info[index].imageURL}
                        alt={categoryInfo[params.category].info[index].titleInfo + ' image'}
                        />
                    </div>
                </div>
            ))} 
        </div>
    );
};

export default Category;