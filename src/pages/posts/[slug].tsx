import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { RichText } from "prismic-dom"

import { getPrismicClient } from "../../services/prismic"

import styles from "./post.module.scss"

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post: {content, updatedAt, title, slug} }: PostProps) {
    return(
        <>
            <Head>
                <title>{title} | Ignews</title>
            </Head>
            
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{title}</h1>
                    <time>{updatedAt}</time>
                    <div 
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{__html: content}}
                    />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({req})
    const {slug} = params

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.Title),
        content: RichText.asHtml(response.data.Content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return { 
        props: {
            post,
        }
    }
}