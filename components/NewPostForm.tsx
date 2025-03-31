import createNewPost from "@/lib/createNewPosts";
import { PostProps } from "@/types";
import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

export default function NewPostForm({
  append,
}: {
  append: (newPost: PostProps) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      className="w-96 rounded-xl p-4 bg-sky-400"
      onSubmit={(e) => {
        e.preventDefault();
        createNewPost(title, content)
          .then((p) => append(p))
          .catch((err) => console.error(err));
      }}
    >
      <TextField
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        sx={{
          padding: "0.5rem",
          height: "100px",
          width: "100%",
          borderRadius: 0,
        }}
        variant="soft"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <FormHelperText>What&apos;s on your mind?</FormHelperText>
      <div className="w-full flex justify-center">
        <Button type="submit" variant="contained" sx={{ width: "80px" }}>
          Create
        </Button>
      </div>
    </form>
  );
}
