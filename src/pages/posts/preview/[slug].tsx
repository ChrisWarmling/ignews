import { GetStaticPaths, GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { RichText } from "prismic-dom"
import { useEffect } from "react"

import { getPrismicClient } from "../../../services/prismic"

import styles from "../post.module.scss"

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post: {content, updatedAt, title, slug} }: PostPreviewProps) {
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${slug}`)
        }
    }, [session]);

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
                    className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{__html: content}}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href='/'>
                            <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            // {
            //     params: {
            //         slug: "bun-can-become-the-ideal-javascript-runtime",
            //     }
            // }
        ],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {slug} = params

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.Title),
        content: RichText.asHtml(response.data.Content.splice(0, 2)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return { 
        props: {
            post,
        },
        revalidate: 60 * 30 //30 minutos
    }
}