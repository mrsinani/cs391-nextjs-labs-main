"use server";

import { PostProps } from "@/types";
import getCollection, { POSTS_COLLECTION } from "@/db";

export default async function createNewPost(
  title: string,
  content: string,
): Promise<PostProps | null> {
  const p = {
    title: title,
    content: content,
    upvotes: 0,
    downvotes: 0,
  };

  const postsCollection = await getCollection(POSTS_COLLECTION);
  const res = await postsCollection.insertOne(p);

  if (!res.acknowledged) {
    return null;
  }

  return JSON.parse(JSON.stringify({ ...p, id: res.insertedId.toHexString() })) as PostProps;
}
