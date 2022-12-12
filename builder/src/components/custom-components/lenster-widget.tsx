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
  const postIds = useSelector((state: IRootState) => state.widget.publications);
  console.log(postIds, "postIds-widget");

  const inputValue = useSelector(
    (state: IRootState) => state.widget.inputValue
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("postIdsss", postIds);

    // dispatch(getPublication(postId));
    dispatch(
      updateWorkspaceElement({
        settingItemId: i,
        propertyName: "postIds",
        propertyValue: postIds,
      })
    );
  }, [dispatch, i, postIds]);
  return (
    <>
      {postIds && postIds.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-1">
            {postIds.map((postId) => {
              const updateProfilePicture =
                "https://ipfs.io/ipfs/" + postId.profilePicture?.slice(7);
              console.log(
                postId.profilePicture?.includes("ipfs://"),
                "postId.profilePicture?.slice(7)"
              );

              console.log(updateProfilePicture, "updateprofile");
              const updatePostMedia =
                "https://ipfs.io/ipfs/" + postId?.postMedia?.slice(7);

              return (
                <>
                  {postId.name && inputValue ? (
                    <div className="border h-fit py-4 px-6 border-gray-700 bg-gray-800 rounded-xl w-[21rem] m-2">
                      <div className="flex">
                        <div className="flex grow">
                          <img
                            className="mt-1 mr-2 w-[2.4rem] h-[2.4rem] rounded-[2rem]"
                            src={`${
                              postId.profilePicture?.includes("ipfs://")
                                ? updateProfilePicture
                                : postId.postMedia
                            }`}
                          />
                          <div className="grid grow">
                            <h2 className="font-semibold text-gray-100 hover:underline">
                              {postId.profileName}
                            </h2>
                            <h2 className="text-gray-500 text-sm block">
                              {postId.handle}
                            </h2>
                          </div>
                          <a
                            href={`https://open.withlens.app/post/${postId.name}`}
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
                          {postId.postDescription}
                        </p>
                      </div>
                      {postId?.postMedia ? (
                        <img
                          src={`${
                            postId.postMedia?.includes("ipfs://")
                              ? updatePostMedia
                              : postId.postMedia
                          }`}
                        />
                      ) : null}

                      <h2 className="mt-2 text-sm text-gray-500 hover:underline">
                        {postId.createdAt}
                      </h2>

                      {/* <img src={coverPicture} /> */}
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>
        </>
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
