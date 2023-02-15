import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import homeStyles from '@/styles/Home.module.css'
import {GetStaticProps} from "next";
import {getSortedPostsData} from "../../lib/post";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

const Home = ({allPostsData}: {
    allPostsData: {
        date: string;
        title: string;
        id: string;
    }[]
}) => {
    return (
        <div className={homeStyles.headingMd}>
            <Head>
                <title>John Ahn</title>
            </Head>
            <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
                <p>[John Ahn Introduction]</p>
                <p>
                    (This is a website)
                </p>
            </section>
            <section>
                <h2 className={homeStyles.headingLg}>Blog</h2>
                <ul className={homeStyles.list}>
                    {allPostsData && allPostsData.map(({id, title, date}) =>
                        <li className={homeStyles.listItem} key={id}>
                            <Link href={`posts/${id}`}>
                                {title}
                            </Link>
                            <br/>
                            <small className={homeStyles.lightText}>
                                {date}
                            </small>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
}