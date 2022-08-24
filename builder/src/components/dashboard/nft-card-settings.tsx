import React from "react";

const NftCardSettings = ({ selectedItem, setSlug }) => {
  const setContractSlug = (slug: string) => {
    setSlug(slug);
  };

  return (
    <>
      <h3 className="mb-3 ml-8">
        Component -
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <section className="pl-4 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Fetch NFTs From
        <button
          className="block my-4 px-6 py-1 shadow text-[18px] text-black border"
          onClick={() => setContractSlug("wallet")}
        >
          Wallet
        </button>
        OR
        <div className="my-2 text-black">
          <label htmlFor="collection-slug" className="text-sm">
            Collection Slug
          </label>
          <input
            className="changeText"
            type="text"
            name="collection-slug"
            placeholder="slug"
            value={
              selectedItem?.slug !== "wallet" ? selectedItem?.slug : ""
            }
            onChange={(e) => setContractSlug(e.target.value)}
          />
        </div>
      </section>
    </>
  );
};

export default NftCardSettings;
