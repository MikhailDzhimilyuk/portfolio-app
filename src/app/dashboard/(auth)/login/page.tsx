"use client"

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.scss';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement,
  password: HTMLInputElement,
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const firstLogSocials = async (email: string, name: string) => {
    try {
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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
    const handleSubmit = (e: FormEvent<FormElement>) => {
      e.preventDefault();
      const email = e.currentTarget.elements.email.value;
      const password = e.currentTarget.elements.password.value;
      signIn("credentials", { email, password });
    };

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            maxLength={200}
            className={styles.input}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            maxLength={50}
            className={styles.input}
          />
          <button className={styles.button}>Login with Email</button>
        </form>
  
        <button onClick={() => signIn("yandex")} className={styles.yandex}>Login with Yandex</button>
        <Link className={styles.register} href='/dashboard/register'>Don't have an account? Register</Link>
      </div>
    );
  }
};

export default Login;