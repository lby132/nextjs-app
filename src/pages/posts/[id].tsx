import React from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds, getPostData, getSortedPostsData} from "../../../lib/post";
import Head from "next/head";
import postStyle from "../../styles/Post.module.css";

const Post = ({postData}: {
    postData: {
        title: string;
        date: string;
        contentHtml: string;
    }
}) => {
    return (
        <div className={postStyle.container}>
            <Head>
                <title>{postData?.title}</title>
            </Head>
            <article>
                {/*className={homeStyles.headingXl*/}
                <h1>{postData?.title}</h1>
                <div>
                    {postData?.date}
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </div>
    );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    // paths에는 [{params: {id: 'pre-rendering'}}, {params: {id: 'ssg-ssr'}}] 이런식으로 들어있다.
    return {
        paths,
        fallback: false
    }
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params.id as string);
    return {
        props: {
            postData
        }
    }
}