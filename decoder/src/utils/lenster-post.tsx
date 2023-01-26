import { FC } from "react";
import LensterIcon from "utils/assets/lenster-svg";
import lenster from "assets/lenster-default.svg";
import { IPublication } from "interfaces/publications";
import "styles/components.css";

interface ILensterPost {
  post: IPublication;
  updateProfilePicture: string;
  updatePostMedia: string;
}

const LensterPost: FC<ILensterPost> = ({
  post,
  updateProfilePicture,
  updatePostMedia,
}) => {
  return (
    <>
      {post.name ? (
        <div className="border lenster-card py-4 px-6 border-gray-700 bg-gray-800 rounded-xl w-[28rem] mx-[0.5rem] my-[1.3rem]">
          <div className="flex">
            <div className="flex grow">
              <img
                className="mt-1 mr-2 w-[2.4rem] h-[2.4rem] rounded-[2rem]"
                src={`${
                  post.profilePicture
                    ? `${
                        post.profilePicture?.includes("ipfs://")
                          ? updateProfilePicture
                          : post.postMedia
                      }`
                    : lenster
                }`}
              />
              <div className="grid grow">
                <h2 className="font-semibold text-gray-100 hover:underline">
                  {post.profileName}
                </h2>
                <h2 className="text-gray-500 text-sm block">{post.handle}</h2>
              </div>
              <a
                href={`https://open.withlens.app/post/${post.name}`}
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
              {post.postDescription}
            </p>
          </div>
          {post.postMedia ? (
            <img
              src={`${
                post.postMedia?.includes("ipfs://")
                  ? updatePostMedia
                  : post.postMedia
              }`}
            />
          ) : null}

          <h2 className="mt-2 text-sm text-gray-500 hover:underline">
            {post.createdAt}
          </h2>
        </div>
      ) : null}
    </>
  );
};

export default LensterPost;
