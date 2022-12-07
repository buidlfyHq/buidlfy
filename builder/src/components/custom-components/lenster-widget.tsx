import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import deleteContainer from "assets/icons/delete.png";
import { getPublication } from "redux/widget/widget.actions";
import edit from "assets/icons/edit.png";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import "styles/components.css";
import LensterIcon from "components/utils/assets/lenster-svg";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  setDrag: (drag: boolean) => void;
}

const LensterWidget: FC<ILensterWidget> = ({ i, setDrag }) => {
  const postId = useSelector(
    (state: IRootState) => state.widget.publicationId.name
  );
  const profileId = useSelector((state: IRootState) => state.widget.profileId);
  const ownedBy = useSelector((state: IRootState) => state.widget.ownedBy);
  const profilePicture = useSelector(
    (state: IRootState) => state.widget.profilePicture
  );
  const coverPicture = useSelector(
    (state: IRootState) => state.widget.coverPicture
  );
  const handle = useSelector((state: IRootState) => state.widget.handle);
  const name = useSelector((state: IRootState) => state.widget.name);
  const createdAt = useSelector((state: IRootState) => state.widget.createdAt);
  const postDescription = useSelector(
    (state: IRootState) => state.widget.postDescription
  );
  const postMedia = useSelector((state: IRootState) => state.widget.postMedia);
  const inputValue = useSelector(
    (state: IRootState) => state.widget.inputValue
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getPublication({ publicationId: postId }));
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: "publicationId",
        propertyValue: postId,
      })
    );
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: "profileId",
        propertyValue: profileId,
      })
    );
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: "ownedBy",
        propertyValue: ownedBy,
      })
    );
  }, [dispatch, i, postId, profileId, ownedBy]);
  console.log(postId, "postId");
  console.log(profileId, "profileid");
  console.log(ownedBy, "ownedby");
  console.log(profilePicture, "profilepic");
  console.log(coverPicture, "coverPic");
  console.log(postMedia, "postMedia");
  const updateProfilePicture =
    "https://ipfs.io/ipfs/" + profilePicture?.slice(7);
  console.log(updateProfilePicture, "updateprofile");
  const updatePostMedia = "https://ipfs.io/ipfs/" + postMedia?.slice(7);
  return (
    <>
      {postId && inputValue ? (
        <div className="border py-4 px-6 border-gray-700 bg-gray-800 rounded-xl w-[25rem] m-2">
          {/* <h2>POST ID - {postId}</h2>
          <h2>PROFILE ID - {profileId}</h2> */}
          {/* <h2>OWNED BY - {ownedBy}</h2> */}
          <div className="flex">
            <div className="flex grow">
              <img
                className="mt-1 mr-2 w-[2.4rem] h-[2.4rem] rounded-[2rem]"
                src={updateProfilePicture}
              />
              <div className="grid grow">
                <h2 className="font-semibold text-gray-100 hover:underline">
                  {name}
                </h2>
                <h2 className="text-gray-500 text-sm block">{handle}</h2>
              </div>
              <a
                href={`https://open.withlens.app/post/${postId}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-500"
                rel="noreferrer"
              >
                <LensterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start flex-1 mt-2.5 w-full my-1">
            <p className="text-gray-300 whitespace-pre-line  ">
              {postDescription}
            </p>
          </div>
          {postMedia ? <img src={updatePostMedia} /> : null}

          <h2 className="mt-2 text-sm text-gray-500 hover:underline">
            {createdAt}
          </h2>

          {/* <img src={coverPicture} /> */}
        </div>
      ) : (
        <>
          <div
            className="w-full h-full py-10 default-container "
            key={"DefaultElement"}
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
            <div
              className="container-div"
              onMouseOut={() => setDrag(true)}
              onMouseOver={() => setDrag(false)}
            >
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
        </>
      )}
    </>
  );
};

export default LensterWidget;

function onComponentEditClick(i: string): void {
  throw new Error("Function not implemented.");
}
