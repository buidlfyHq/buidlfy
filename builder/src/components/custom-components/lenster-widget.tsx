import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import edit from 'assets/icons/edit.png';
import LensterPost from 'components/utils/lenster-post';
import 'styles/components.css';

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  setDrag: (drag: boolean) => void;
}

const LensterWidget: FC<ILensterWidget> = ({ i, setDrag }) => {
  const posts = useSelector((state: IRootState) => state.lenster.publications);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: 'postIds',
        propertyValue: posts,
      }),
    );
  }, [dispatch, i, posts]);

  return (
    <>
      {posts && posts.length > 0 ? (
        <>
          <div id={i} className="lenster-div m-[1rem]">
            {posts.map(post => {
              const updateProfilePicture = 'https://ipfs.io/ipfs/' + post.profilePicture?.slice(7);
              const updatePostMedia = 'https://ipfs.io/ipfs/' + post?.postMedia?.slice(7);
              return <LensterPost i={i} post={post} updateProfilePicture={updateProfilePicture} updatePostMedia={updatePostMedia} />;
            })}
          </div>
        </>
      ) : (
        <div
          className="w-full h-full py-10 default-container "
          key={'DefaultElement'}
          data-grid={{
            x: 0,
            y: 0,
            w: 6,
            h: 2,
            minH: 1,
            minW: 1,
            resizeHandles: [],
          }}
        >
          <div className="container-div" onMouseOut={() => setDrag(true)} onMouseOver={() => setDrag(false)}>
            <span className="container-text">Add Lenster Posts</span>
          </div>
          <div className="flex absolute top-[0.5rem] right-[0.6rem]">
            <div
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
              className="w-[30px] h-[30px] rounded-[25px] flex justify-center items-center content-center bg-white"
              id="edit-img"
            >
              <img className="w-[13px] h-[13px]" src={edit} alt="edit" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LensterWidget;
