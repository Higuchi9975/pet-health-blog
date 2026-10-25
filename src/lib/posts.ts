import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
  // 下書き(draft: true)は、手元の確認用サーバー(npm run dev)でだけ表示し、公開用ビルドには含めない
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) =>
    b.data.publishDate.localeCompare(a.data.publishDate) || a.slug.localeCompare(b.slug),
  );
}
