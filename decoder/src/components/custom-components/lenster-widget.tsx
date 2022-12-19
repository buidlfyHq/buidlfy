import { FC } from "react";
import LensterPost from "utils/lenster-post";
import { IPublication } from "interfaces/publications";
import "styles/components.css";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  postIds: Array<IPublication>;
}

const LensterWidget: FC<ILensterWidget> = ({ postIds }) => {
  return (
    <div className="lenster-div ml-[1.7rem]">
      {postIds.map((postId) => {
        const updateProfilePicture =
          "https://ipfs.io/ipfs/" + postId.profilePicture?.slice(7);
        const updatePostMedia =
          "https://ipfs.io/ipfs/" + postId?.postMedia?.slice(7);
        return (
          <LensterPost
            postId={postId}
            updateProfilePicture={updateProfilePicture}
            updatePostMedia={updatePostMedia}
          />
        );
      })}
    </div>
  );
};

export default LensterWidget;
