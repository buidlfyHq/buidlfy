import { FC } from 'react';
import { IPublication } from 'redux/lenster/lenster.interfaces';
import LensterPost from './preview-lenster-post';
import 'styles/components.css';

interface IPreviewLenster {
  i: string;
  backgroundColor: string;
  posts: IPublication[];
}

const PreviewLenster: FC<IPreviewLenster> = ({ posts }) => {
  return (
    <div className="lenster-div ml-[1.7rem]">
      {posts.map(post => {
        const updateProfilePicture = 'https://ipfs.io/ipfs/' + post.profilePicture?.slice(7);
        const updatePostMedia = 'https://ipfs.io/ipfs/' + post?.postMedia?.slice(7);
        return <LensterPost post={post} updateProfilePicture={updateProfilePicture} updatePostMedia={updatePostMedia} />;
      })}
    </div>
  );
};

export default PreviewLenster;
