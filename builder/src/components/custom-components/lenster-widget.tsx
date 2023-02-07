import { FC } from 'react';
import { useSelector } from 'react-redux';
import LensterPost from 'components/utils/lenster-post';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IRootState } from 'redux/root-state.interface';
import config from 'config';
import logo from 'assets/icons/buidlfy.png';
import LensterLogo from 'assets/lenster-logo.png';
import edit from 'assets/icons/edit.png';
import 'styles/components.css';

interface ILensterWidget {
  i: string;
  item: IWorkspaceElement;
  setDrag: (drag: boolean) => void;
}

const LensterWidget: FC<ILensterWidget> = ({ i, item, setDrag }) => {
  const posts = useSelector((state: IRootState) =>
    state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === i).posts.filter(publication => publication.i === i),
  );

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
            <a href={config.site.SITE_URL} target="_blank" rel="noreferrer">
              <span className="flex absolute right-[1rem] bottom-[1rem]">
                Powered By <img className="w-[1.5rem] h-auto mx-2" src={logo} alt="Buidlfy" /> Buidlfy
              </span>
            </a>
          </div>
        </>
      ) : (
        <div
          className="w-full h-full py-10 default-container "
          key={i}
          id={i + item.name}
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
          <>
            <div className="container-div-lenster" onMouseOut={() => setDrag(true)} onMouseOver={() => setDrag(false)}>
              <div className="flex flex-col items-center p-10">
                <img src={LensterLogo} width={72} height={72} alt="lenster_logo" />
                <div className="text-[#14142B] text-[22px] font-[800] mt-7">Add Lenster Posts in your website</div>
                <div className="text-[#4E4B66] text-[15px] mt-2">Share your favourite links from all around the internet!</div>
                <div className="flex items-center gap-2 text-[#4E4B66] text-[15px] mt-3">
                  <span>Click on</span>
                  <img className="w-[13px] h-[13px]" src={edit} alt="edit" />
                  <span>icon to add you post and create your own Wall of Love</span>
                </div>
              </div>
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
          </>
        </div>
      )}
    </>
  );
};

export default LensterWidget;
