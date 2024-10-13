"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub 스타일의 마크다운 지원
import Layout from "@/components/Layout";
import Giscus from "@giscus/react"; // Giscus React 컴포넌트 추가

// API에서 마크다운 파일을 가져오는 함수
async function fetchPost(slug: string): Promise<string> {
  // 슬러그를 URL 디코딩하여 서버 API에 전달
  const decodeSlug = decodeURIComponent(slug);

  const res = await fetch("/api/fetch-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug: decodeSlug }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(`Error fetching post: ${message}`);
  }

  const { content } = await res.json();
  return content;
}

// 동적 라우팅으로 들어온 슬러그에 따라 마크다운 렌더링
export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const fetchedContent = await fetchPost(slug);
        setContent(fetchedContent);
        console.log(fetchedContent);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        setContent("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchContent();
  }, [slug]);

  // 슬러그를 디코딩하여 제목으로 사용
  const decodedTitle = decodeURIComponent(slug.replace("-", " "));

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">{decodedTitle}</h1>
      <article className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>

      {/* Giscus 댓글 기능 추가 */}
      <div className="mt-8">
        <Giscus
          id="comments"
          repo="JJEliPark/viba_blog" // GitHub 저장소
          repoId="R_kgDOM_MBGA" // 저장소 ID
          category="General" // 카테고리 이름
          categoryId="DIC_kwDOM_MBGM4CjUBj" // 카테고리 ID
          mapping="pathname" // URL 경로를 기준으로 댓글 매핑
          reactionsEnabled="1" // 반응(이모지) 기능 활성화
          emitMetadata="0"
          inputPosition="bottom" // 입력 창 위치 (위 or 아래)
          theme="light" // 테마 설정
          lang="ko" // 언어 설정
          loading="lazy" // 지연 로딩
        />
      </div>
    </Layout>
  );
}
