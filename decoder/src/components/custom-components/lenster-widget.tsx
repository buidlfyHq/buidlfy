import { FC } from "react";
import LensterPost from "utils/lenster-post";
import { IPublication } from "interfaces/publications";
import "styles/components.css";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  posts: IPublication[];
}

const LensterWidget: FC<ILensterWidget> = ({ posts }) => {
  return (
    <div className="lenster-div ml-[1.7rem]">
      {posts.map((post) => {
        const updateProfilePicture =
          "https://ipfs.io/ipfs/" + post.profilePicture?.slice(7);
        const updatePostMedia =
          "https://ipfs.io/ipfs/" + post?.postMedia?.slice(7);
        return (
          <LensterPost
            post={post}
            updateProfilePicture={updateProfilePicture}
            updatePostMedia={updatePostMedia}
          />
        );
      })}
    </div>
  );
};

export default LensterWidget;
