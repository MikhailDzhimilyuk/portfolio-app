"use client"

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement,
  email: HTMLInputElement,
  password: HTMLInputElement,
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}


const Register = () => {
  const [error, setError] = useState<Error | null>(null);
  const [subtitle, setSubtitle] = useState('Please sign up to see the dashboard.');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<FormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");
      if (res.status === 409) { setSubtitle('User with this email is already registered') }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id="name"
          type="text"
          placeholder="Username"
          required
          maxLength={200}
          className={styles.input}
        />
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
        <button className={styles.button}>Register</button>
        {error && "Something went wrong!"}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;