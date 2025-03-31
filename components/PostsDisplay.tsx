"use client";
import { PostProps } from "@/types";
import { useState } from "react";
import PostPreview from "./PostPreview";
import NewPostForm from "./NewPostForm";

export default function PostsDisplay({
  inputPosts,
}: {
  inputPosts: PostProps[];
}) {
  const [posts, setPosts] = useState(inputPosts);

  function append(newPost: PostProps) {
    setPosts([newPost, ...posts]);
  }

  return (
    <div className="flex flex-col items-center">
      <NewPostForm append={append} />
      {posts.map((p) => (
        <PostPreview key={p.id} post={p} />
      ))}
    </div>
  );
}
