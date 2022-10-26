import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import {
  uploadFileToWeb3Storage,
  uploadTemplateToWeb3Storage,
} from "config/web3storage";
import { mintTemplate } from "redux/template/template.actions";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { IRootState } from "redux/root-state.interface";
import InfoCircleImg from "assets/icons/info-circle.png";
import MintUploadImg from "assets/icons/mint-form-img.png";

const MintTemplateForm: FC = () => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );

  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // find suitable type
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5242880) {
        // setSize(true);
      } else {
        // setSize(false);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          setImage(cid);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleSaveTemplate = async () => {
    let newTemplate = {
      image,
      name,
      category,
      description,
      value: workspaceElements,
    };

    console.log("JSON.stringify(newTemplate): ", JSON.stringify(newTemplate));
    const templateCID = await uploadTemplateToWeb3Storage(
      JSON.stringify(newTemplate)
    );
    console.log("templateCID: ", templateCID);
    dispatch(mintTemplate(templateCID));
    dispatch(toggleModalType("minting-progress"));
  };

  return (
    <Dialog.Panel className="flex flex-col w-full max-w-[800px] my-20 mx-28 rounded-[24px] py-12 px-10 bg-white min-h-full">
      <button
        className="flex items-start justify-end w-full"
        onClick={() => dispatch(toggleModal(false))}
      >
        <CgClose className="text-[24px] cursor-pointer" />
      </button>
      <div className="text-[#202525] font-[500] text-[20px] mt-8">
        Save &amp; Mint Template
      </div>
      <div className="mt-2 text-[#2C2D5E] opacity-50 text-[13px]">
        Save this page as a template so you can use it later and you can also
        mint it as NFT
      </div>
      <div className="my-8 mint-upload-img">
        <div className="w-full h-[300px] upload-img-mint cursor-pointer">
          <label className="flex flex-col items-center justify-center h-full text-[12px] text-[#130F1C]">
            <img src={MintUploadImg} alt="icon" width={50} height={50} />
            <div className="text-[13px] text-[#7A7B93] w-[240px] text-center mt-9">
              Upload a file or drag and drop PNG, JPG, GIF in 800*400
              resolution.
            </div>
            <span className="mt-5 text-[#651FFF] text-[12px]">
              Add from your desktop
            </span>
            <input
              onChange={onChangeImage}
              className="hidden block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
              type="file"
              id="formFile"
            />
          </label>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-[#23314B] text-[13px] font-[500]">
          Template Name
        </div>
        <input
          type="text"
          className="py-4 px-5 text-[13px] text-[#23314B] border border-[#C4C4C4] h-[45px] rounded-[8px] outline-none mt-2 w-full"
          placeholder="i.e. Crypto NFT Template"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <div className="text-[#23314B] text-[13px] font-[500]">Category</div>
        <input
          type="text"
          className="py-4 px-5 text-[13px] text-[#23314B] border border-[#C4C4C4] h-[45px] rounded-[8px] outline-none mt-2 w-full"
          placeholder="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <div className="text-[#23314B] text-[13px] font-[500]">
          Template Description
        </div>
        <textarea
          rows={4}
          cols={50}
          className="py-4 px-5 text-[13px] text-[#23314B] border border-[#C4C4C4] rounded-[8px] outline-none mt-2 w-full"
          placeholder="i.e. Crypto NFT Template"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex w-full bg-gray-100 mt-5 rounded-[4px] items-center py-3 px-4">
        <img src={InfoCircleImg} alt="icon" width={17} height={17} />
        <div className="text-[14px] text-[#1C1C1E] opacity-60 ml-2">
          Our team will review the template before making it available on the
          market place.
        </div>
      </div>
      <div className="flex items-center justify-end mt-8">
        <button
          className="bg-[#E8E6EE] cursor-pointer text-[#7B7B7B] font-[500] text-[14px] py-3 px-10 rounded-[8px]"
          onClick={() => dispatch(toggleModal(false))}
        >
          Cancel
        </button>
        {workspaceElements?.length > 0 &&
        image &&
        name &&
        category &&
        description ? (
          <button
            onClick={handleSaveTemplate}
            className="connect-wallet-button cursor-pointer text-white font-[500] text-[14px] py-3 px-12 rounded-[8px] ml-3"
          >
            Mint
          </button>
        ) : (
          <button
            disabled
            className="connect-wallet-button cursor-not-allowed text-white font-[500] text-[14px] py-3 px-12 rounded-[8px] ml-3 opacity-50"
          >
            Mint
          </button>
        )}
      </div>
    </Dialog.Panel>
  );
};

export default MintTemplateForm;
