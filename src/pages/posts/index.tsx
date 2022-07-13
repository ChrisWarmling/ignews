import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="">
                    <time>22 de julho de 2022</time>
                    <strong>Bun (can become) the ideal JavaScript runtime</strong>
                    <p>Finally a JS runtime made to perform — running circles around both Deno and Node.js</p>
                </a>
                <a href="">
                    <time>22 de julho de 2022</time>
                    <strong>Bun (can become) the ideal JavaScript runtime</strong>
                    <p>Finally a JS runtime made to perform — running circles around both Deno and Node.js</p>
                </a>
                <a href="">
                    <time>22 de julho de 2022</time>
                    <strong>Bun (can become) the ideal JavaScript runtime</strong>
                    <p>Finally a JS runtime made to perform — running circles around both Deno and Node.js</p>
                </a>
                <a href="">
                    <time>22 de julho de 2022</time>
                    <strong>Bun (can become) the ideal JavaScript runtime</strong>
                    <p>Finally a JS runtime made to perform — running circles around both Deno and Node.js</p>
                </a>
                
            </div>
        </main>
    </>
  );
}