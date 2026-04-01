import {PostProps} from "@/types";
import {ObjectId} from "mongodb";
import getCollection, {POSTS_COLLECTION} from "@/db";

export default async function getPostById(id:string):Promise<PostProps|null>{

    const postId=ObjectId.createFromHexString(id);

    const postCollection=await getCollection(POSTS_COLLECTION);
    const data=await postCollection.findOne({_id:postId});

    if(data===null){
        return null;
    }

    return {
        id: id,
        title: data.title,
        content: data.content,
        upvotes: data.upvotes,
        downvotes: data.downvotes
    };
}