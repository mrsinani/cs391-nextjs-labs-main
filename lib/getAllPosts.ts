import { PostProps } from "@/types";
import getCollection, {POSTS_COLLECTION} from "@/db";
import { getRedisClient } from "@/lib/redis"

const CACHE_KEY = "all-posts";

export default async function getAllPosts():Promise<PostProps[]>{

  const redis = await getRedisClient();

  // check cache

  const cached = await redis.get(CACHE_KEY);

  if (cached) {
    console.log("cache hit");
    console.log(cached);
    return JSON.parse(cached);
  }

  console.log("cache miss")

  const postsCollection=await getCollection(POSTS_COLLECTION);
  const data=await postsCollection.find().toArray();

  const posts:PostProps[]=data.map((p)=>
      (
          {
            id: p._id.toHexString(),
            title: p.title,
            content:p.content,
            upvotes:p.upvotes,
            downvotes:p.downvotes,
          }
      )
  )
  const reversed = posts.reverse();

  await redis.set(CACHE_KEY, JSON.stringify(reversed), {
    EX: 60,
  });

  return reversed;
}

