// pages/api/create-post.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

    const fileName = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
    const filePath = `post/2024/${fileName}`;

    try {
      const response = await fetch(
        `https://api.github.com/repos/JJEliPark/tech-blog/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Add new post: ${title}`,
            content: Buffer.from(content).toString("base64"), // Base64 인코딩
          }),
        }
      );

      const result = await response.json(); // 응답 내용을 JSON으로 파싱
      console.log("GitHub API 응답:", result); // 응답 내용 로그 출력

      if (response.ok) {
        res.status(200).json({ message: "Post created successfully" });
      } else {
        console.error("GitHub API 오류:", result);
        res
          .status(response.status)
          .json({ message: "Error creating post", details: result });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("API 요청 중 오류 발생:", error.message);
        res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      } else {
        console.error("API 요청 중 알 수 없는 오류 발생:", error);
        res.status(500).json({ message: "Unknown error", error });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
