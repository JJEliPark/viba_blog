import { use } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";

// 마크다운 파일을 GitHub에서 가져오는 함수
async function fetchPost(slug: string): Promise<string> {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  const res = await fetch(
    `https://api.github.com/repos/JJEliPark/tech-blog/contents/post/2024/${slug}.md`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
      cache: "no-store", // 캐시 비활성화
    }
  );

  const data = await res.json();

  if (!data.content) {
    throw new Error("게시글을 불러올 수 없습니다.");
  }

  // Base64 인코딩된 마크다운 파일의 내용을 디코딩
  const content = Buffer.from(data.content, "base64").toString("utf-8");

  return content;
}

// 동적 라우팅으로 들어온 슬러그에 따라 마크다운 렌더링
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // 해당 마크다운 파일의 내용을 가져옴
  let content = "";
  try {
    content = await fetchPost(slug);
  } catch (error) {
    console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
    return <p>게시글을 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">{slug.replace("-", " ")}</h1>
      <article className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </Layout>
  );
}
