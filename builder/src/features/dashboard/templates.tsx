import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber } from "ethers";
import {
  buyTemplate,
  fetchOwnedTemplates,
  fetchTemplates,
} from "redux/template/template.actions";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { addresses } from "redux/web3/web3.utils";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import "styles/components.css";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";

interface ITemplate {
  setIsNavHidden: (isNavHidden: boolean) => void;
}

const Template: FC<ITemplate> = ({ setIsNavHidden }) => {
  const dispatch = useDispatch();
  const [allTemplates, setAllTemplates] = useState<any>();
  const [userTemplates, setUserTemplates] = useState<any>();
  const templateList = useSelector((state: any) => state.template.templateList);
  const ownedTemplateList = useSelector(
    (state: any) => state.template.ownedTemplateList
  );

  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(fetchOwnedTemplates());
  }, []);

  // set templates after fetching the templates
  useEffect(() => {
    setTemplates();
  }, [templateList]);

  // set templates after fetching the templates
  useEffect(() => {
    setOwnedTemplates();
  }, [ownedTemplateList]);

  const setTemplates = async () => {
    let newTemplates = (
      await Promise.all(
        templateList.map(async (template: any) => {
          if (
            template.listing_assetContract.toLowerCase() ===
            addresses.spheronErc1155.toLowerCase()
          ) {
            try {
              const templateObj: IWorkspaceElement = await (
                await fetch(template.token.uri)
              ).json();

              return { ...template, ...templateObj };
            } catch (error) {
              console.error("error: ", error);
            }
          }
        })
      )
    ).filter((template: any) => template !== undefined);

    setAllTemplates(newTemplates);
  };

  const setOwnedTemplates = async () => {
    let newTemplates = (
      await Promise.all(
        ownedTemplateList.map(async (template: any) => {
          if (
            template.listing_assetContract.toLowerCase() ===
            addresses.spheronErc1155.toLowerCase()
          ) {
            try {
              const templateObj: IWorkspaceElement = await (
                await fetch(template.token.uri)
              ).json();

              return { ...template, ...templateObj };
            } catch (error) {
              console.error("error: ", error);
            }
          }
        })
      )
    ).filter((template: any) => template !== undefined);

    setUserTemplates(newTemplates);
  };

  const handleOpenTemplate = (value: IWorkspaceElement[]) => {
    dispatch(updateWorkspaceElementsArray(value));
    setIsNavHidden(true);
  };

  const handleBuyTemplate = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    setIsNavHidden(true);
    dispatch(toggleModal(true));
    dispatch(toggleModalType("single"));
  };

  return (
    <>
      <form className="flex items-center mb-5">
        <div className="relative mt-[2rem] mx-3 w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="search rounded-full focus:ring-[#dee0e9] focus:border-[#dee0e9] block w-full pl-10 p-2.5 "
            placeholder="Search"
            required
          />
        </div>
      </form>
      <div className="mx-9">
        <span className="badge mt-12 px-2.5 py-2.5">Default</span>
        <span className="badge ml-2.5 mt-12 px-2.5 py-2.5">Default</span>
        <span className="badge ml-2.5 mt-12 px-2.5 py-2.5">Default</span>
      </div>
      <main className="min-h-screen px-1 py-10 mt-2">
        {/* Owned Templates */}
        <section className="mx-2 mb-2">
          <p className="mb-2">Owned Templates</p>
          <div className="grid grid-cols-2 gap-4">
            {userTemplates &&
              userTemplates.map((temp: ISelectedTemplate) => (
                <div
                  key={temp.id}
                  onClick={() => handleOpenTemplate(temp.value)}
                  className="cursor-pointer flex flex-col justify-center items-center"
                >
                  <img className="rounded-[0.25rem]" src={temp.image} />
                  <div className="margin-text text-xs">{temp.name}</div>
                </div>
              ))}
          </div>
        </section>
        {/* All Templates */}
        <section className="mx-2 mb-2">
          <p className="mb-2">All Templates</p>
          <div className="grid grid-cols-2 gap-4">
            {allTemplates &&
              allTemplates.map((temp: ISelectedTemplate) => (
                <div
                  key={temp.id}
                  onClick={() => handleBuyTemplate(temp)}
                  className="cursor-pointer flex flex-col justify-center items-center"
                >
                  <img className="rounded-[0.25rem]" src={temp.image} />
                  <div className="margin-text text-xs">{temp.name}</div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Template;
