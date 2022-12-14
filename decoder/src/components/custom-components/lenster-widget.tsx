import { FC } from "react";
import LensterIcon from "utils/assets/lenster-svg";
import lenster from "assets/lenster-default.svg";
import "styles/components.css";

interface ILensterWidget {
  i: string;
  backgroundColor: string;
  postIds: Array<any>;
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
          <>
            {postId.name ? (
              <div className="border lenster-card py-4 px-6 border-gray-700 bg-gray-800 rounded-xl w-[28rem] m-2">
                <div className="flex">
                  <div className="flex grow">
                    <img
                      className="mt-1 mr-2 w-[2.4rem] h-[2.4rem] rounded-[2rem]"
                      src={`${
                        postId.profilePicture
                          ? `${
                              postId.profilePicture?.includes("ipfs://")
                                ? updateProfilePicture
                                : postId.postMedia
                            }`
                          : lenster
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
                {postId.postMedia ? (
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
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default LensterWidget;
