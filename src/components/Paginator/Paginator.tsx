import Link from 'next/link';
import styles from './paginator.module.scss';

interface IPropsPaginator {
  url: string,
  elemsShown: number,
  choosedElem: number,
  numOfElems: number
}

const Paginator = ({url, elemsShown, choosedElem, numOfElems} : IPropsPaginator) => {
  const num =  numOfElems / elemsShown;
  const lengthArr = (num - Math.trunc(num) > 0.0001) ? 
    Math.floor(num) + 1 : Math.floor(num);
  const array : number[] = [...Array(lengthArr)];
  const prevPage = (choosedElem <= 1) ? choosedElem : Number(choosedElem) - 1;
  const nextPage = (choosedElem > lengthArr - 1) ? choosedElem : Number(choosedElem) + 1;

  const filteredArr = array.map((el, index) => el = index + 1).filter((elem) => (
    Math.abs(choosedElem - elem) <= 2 ||
    (choosedElem == 2 && elem == 5) ||
    (choosedElem == 1 && (elem == 4 || elem == 5)) ||
    (choosedElem == array.length && (elem == array.length - 3 || elem == array.length - 4)) ||
    (choosedElem == array.length - 1 && elem == array.length - 4)
  ));

  return (
    <div className={styles.container}>
      {filteredArr.length > 1 &&
      <>
        <Link className={styles.arrow} href={`${url}?p=${prevPage}`}>{'<'}</Link>
        {filteredArr.map((elem) => 
          <Link 
            href={`${url}?p=${elem}`} 
            className={(choosedElem == elem) ? `${styles.item} ${styles.choosedItem}` : `${styles.item}`} 
            key={elem}>{elem}
          </Link>
        )}
        <Link className={styles.arrow} href={`${url}?p=${nextPage}`}>{'>'}</Link>
      </>}
      
    </div>
  );
};

export default Paginator;