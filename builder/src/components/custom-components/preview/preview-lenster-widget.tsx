import { FC } from 'react';
import LensterPost from 'components/utils/lenster-post';
import { IPublication } from 'redux/lenster/lenster.interfaces';
import logo from 'assets/icons/buidlfy.png';
import 'styles/components.css';

interface IPreviewLensterWidget {
  i: string;
  posts: IPublication[];
  preview: boolean;
}

const PreviewLensterWidget: FC<IPreviewLensterWidget> = ({ i, posts, preview }) => {
  return (
    <div className="lenster-div ml-[2.6rem] mr-[2rem] mt-[1.3rem]">
      {posts.map(post => {
        const updateProfilePicture = 'https://ipfs.io/ipfs/' + post.profilePicture?.slice(7);
        const updatePostMedia = 'https://ipfs.io/ipfs/' + post?.postMedia?.slice(7);
        return <LensterPost preview={preview} i={i} post={post} updateProfilePicture={updateProfilePicture} updatePostMedia={updatePostMedia} />;
      })}
      <span className="flex absolute right-[1rem] bottom-[1rem]">
        Powered By <img className="w-[1.5rem] h-auto mx-2" src={logo} alt="Buidlfy" /> Buidlfy
      </span>
    </div>
  );
};

export default PreviewLensterWidget;
