import { PostProps } from "@/types";
import mockData from "@/mock.json";

export default async function getAllPosts(): Promise<PostProps[]> {
  return mockData.mockPosts;
}
