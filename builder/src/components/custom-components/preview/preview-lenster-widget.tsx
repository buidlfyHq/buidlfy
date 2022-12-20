import LensterPost from 'components/utils/lenster-post';
import { FC } from 'react';
import { IPublication } from 'redux/lenster/lenster.interfaces';
import 'styles/components.css';

interface IPreviewLensterWidget {
  i: string;
  posts: IPublication[];
  preview: boolean;
}

const PreviewLensterWidget: FC<IPreviewLensterWidget> = ({ posts, preview, i }) => {
  return (
    <div className="lenster-div ml-[1.7rem]">
      {posts.map(post => {
        const updateProfilePicture = 'https://ipfs.io/ipfs/' + post.profilePicture?.slice(7);
        const updatePostMedia = 'https://ipfs.io/ipfs/' + post?.postMedia?.slice(7);
        return <LensterPost preview={preview} i={i} post={post} updateProfilePicture={updateProfilePicture} updatePostMedia={updatePostMedia} />;
      })}
    </div>
  );
};

export default PreviewLensterWidget;
