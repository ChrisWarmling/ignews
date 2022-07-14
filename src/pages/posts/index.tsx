import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'
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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], {
        fetch: ['title', 'content'],
        pageSize: 100,
    });

    console.log(JSON.stringify(response, null, 2));

    return {
        props: {},
    };
}