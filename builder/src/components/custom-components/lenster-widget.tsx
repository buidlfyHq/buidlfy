import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LensterPost from 'components/utils/lenster-post';
import { IRootState } from 'redux/root-state.interface';
import edit from 'assets/icons/edit.png';
import logo from 'assets/icons/buidlfy.png';
import 'styles/components.css';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';

interface ILensterWidget {
  i: string;
  setDrag: (drag: boolean) => void;
}

const LensterWidget: FC<ILensterWidget> = ({ i, setDrag }) => {
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const posts = useSelector((state: IRootState) =>
    state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === i).posts.filter(publication => publication.i === i),
  );
  // const posts = useSelector((state: IRootState) => state.lenster.publications.filter(publication => publication.i === i));
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  console.log(workspaceElements, 'workspaceElements');
  console.log(posts, 'post');
  console.log(selectedElement, 'selectedElement');

  // useEffect(() => {
  //   console.log(posts, 'post');
  // }, [posts]);
  return (
    <>
      {posts && posts.length > 0 ? (
        <>
          <div id={i} className="lenster-div m-[1rem]">
            {posts.map(post => {
              console.log(post.handle, 'post');
              const updateProfilePicture = 'https://ipfs.io/ipfs/' + post.profilePicture?.slice(7);
              const updatePostMedia = 'https://ipfs.io/ipfs/' + post?.postMedia?.slice(7);
              return <LensterPost i={i} post={post} updateProfilePicture={updateProfilePicture} updatePostMedia={updatePostMedia} />;
            })}
            <span className="flex absolute right-[1rem] bottom-[1rem]">
              Powered By <img className="w-[1.5rem] h-auto mx-2" src={logo} /> Buidlfy
            </span>
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
