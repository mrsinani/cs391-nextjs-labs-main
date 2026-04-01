import {PostProps} from "@/types";
import {ThumbUp,ThumbDown} from "@mui/icons-material";

export default function FullPost({post}:{post:PostProps}){
    return(
        <>
            <h2>{post.id}</h2>
            <p>{post.content}</p>
            <div className={`flex`}>
                <div className={`p1 m1`}>
                    {post.upvotes}
                    <ThumbUp/>
                </div>
            </div>
            <div>
                <div className={`p1 m1`}>
                    {post.downvotes}
                    <ThumbDown/>
                </div>
            </div>
        </>
    );

}