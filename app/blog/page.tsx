import Link from "next/link";
import Layout from "@/components/Layout";

// Post 타입 정의
interface Post {
  title: string;
  slug: string;
}

// fetchPosts 함수의 반환 타입을 명시적으로 지정
async function fetchPosts(): Promise<Post[]> {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  const res = await fetch(
    `https://api.github.com/repos/JJEliPark/tech-blog/contents/post/2024`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
      cache: "no-store", // 캐시 비활성화
    }
  );

  const data = await res.json();

  // data가 배열인지 확인
  if (!Array.isArray(data)) {
    throw new Error("API 응답이 배열 형식이 아닙니다.");
  }

  return data
    .filter((file: any) => file.name.endsWith(".md"))
    .map((file: any) => ({
      title: file.name.replace(".md", ""),
      slug: file.name.replace(".md", ""),
    }));
}

export default async function Blog() {
  let posts: Post[] = [];
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {/* New Post 버튼 */}
      <Link href="/blog/new-post">
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg z-50"
          style={{ zIndex: 50 }}
        >
          New Post
        </button>
      </Link>
    </Layout>
  );
}
