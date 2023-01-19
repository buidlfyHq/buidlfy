import { FC } from "react";
import LensterPost from "utils/lenster-post";
import { IPublication } from "interfaces/publications";
import logo from "assets/buidl.png";
import "styles/components.css";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  posts: IPublication[];
}

const LensterWidget: FC<ILensterWidget> = ({ posts }) => {
  return (
    <div className="lenster-div ml-[2.6rem] mr-[2rem] mt-[1.3rem]">
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
      <span className="flex absolute right-[1rem] bottom-[1rem]">
        Powered By <img className="w-[1.5rem] h-auto mx-2" src={logo} /> Buidlfy
      </span>
    </div>
  );
};

export default LensterWidget;
