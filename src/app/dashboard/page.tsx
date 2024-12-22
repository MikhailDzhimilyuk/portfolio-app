'use client'

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [shownPosts, SetShownPosts] = useState(2);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?email=${session?.data?.user?.email}`,
    fetcher
  );
  
  useEffect(() => {
    if (session.status == "unauthenticated") { router?.push("/dashboard/login"); }
  }, [session.status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          email: session.data?.user?.email
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event: React.SyntheticEvent<EventTarget>, id: string) => {
    event.stopPropagation();
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  const openPost = (url: string) => {router.push(url);}

  if (session.status == "loading") {
    return <p>Loading...</p>;
  }

  if (session.status == "authenticated") {
    const getClassNamePost = (index: number) => {
      return (index <= shownPosts) ? `${styles.post}` : `${styles.post} ${styles.hidden}`;
    }
  
    return (
      <div className={styles.container}>
        {
          !isLoading &&
            <div className={styles.posts}>
            {data.toReversed().map((post, index) => (
              <div onClick={() => openPost(`/blog/${post.id}`)} className={getClassNamePost(index)} key={post.id}>
                <div className={styles.imgContainer}>
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill={true}
                    className={styles.img}
                  />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.delete}
                  onClick={(event) => handleDelete(event, post.id)}
                >
                  ✖
                </span>
              </div>
        ))}
        {(data.length < 4) ? null : (shownPosts >= data.length - 1) ?
        <button className={`${styles.btnHide}`} onClick={() => SetShownPosts(2)}>Hide</button> :
          <button className={`${styles.btnShowMore}`} onClick={() => SetShownPosts(shownPosts + 3)}>Show More...</button>
        }
      </div>
        
      }
       

        <form className={styles.newform} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" autoComplete="off" placeholder="Title" maxLength={100} required className={styles.input} />
          <input type="text" autoComplete="off" placeholder="Description" maxLength={250} required className={styles.input} />
          <input 
            type="url" 
            placeholder="Image URL from Freepik/Unsplash" 
            autoComplete="off" 
            className={styles.input} 
            maxLength={500}
            required
            pattern="https://img.freepik.com/.*|https://images.unsplash.com/.*"
            />
          <textarea 
            placeholder="Content"
            cols={30} 
            rows={10} 
            maxLength={3500} 
            required 
            className={styles.textArea} 
          />
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
}

export default Dashboard;