import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import * as process from "process";
import {remark} from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // posts 파일 이름 잡아주기
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map(fileNames => {
        const id = fileNames.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileNames);

        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...(matterResult.data as { date: string; title: string; })
        };
    })

    // Sorting
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileNames => {
        return {
            params: {
                id: fileNames.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(remarkHtml).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as {date: string; title: string;})
    }
}