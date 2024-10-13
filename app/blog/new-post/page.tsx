"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // 태그 필드 추가
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const tagsArray = tags.split(",").map((tag) => tag.trim()); // ","로 태그를 분리하여 배열로 변환

    const markdownContent = `---
title: "${title}"
date: "${new Date().toISOString().split("T")[0]}"
description: "${description}"
tags: [${tagsArray.map((tag) => `"${tag}"`).join(", ")}] 
---

${content}
`;

    const res = await fetch("/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content: markdownContent,
      }),
    });

    if (res.ok) {
      alert("Post created successfully!");
      router.push("/blog");
    } else {
      alert("Error creating post");
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tags (comma separated)</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., tech, career, ai"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Content</label>
            <textarea
              className="border p-2 w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit Post
          </button>
        </form>
      </div>
    </Layout>
  );
}
