"use client"

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const firstLogSocials = async (email: string, name: string) => {
    try {
      let data = true// await getUser(email);

      if (!data) {
        const password = '';
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            password,
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  const signInSocials = () => {
   signIn("yandex");
  }



  useEffect(() => {
    if (session.status == "authenticated") {
        if (session.data?.user?.email?.includes('@yandex.ru')) {
        const email = session.data.user.email;
        const name = session.data.user?.name
        firstLogSocials(email, name || 'John Doe');
      }
      router?.push("/dashboard");
    }
  }, [session.status]);

  if (session.status == "loading"){
    return <p className={styles.logstatus}>Loading...</p>
  }

  if (session.status == "unauthenticated") {
    const handleSubmit = (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      signIn("credentials", { email, password });
    };
    console.log('rerender')
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            required
            maxLength={200}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            maxLength={50}
            className={styles.input}
          />
          <button className={styles.button}>Login with Email</button>
        </form>
  
        <button onClick={() => signInSocials()} className={styles.yandex}>Login with Yandex</button>
        <Link className={styles.register} href='/dashboard/register'>Don't have an account? Register</Link>
      </div>
    );
  }
};

export default Login;