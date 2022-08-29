const NftCardSettings = ({ selectedItem, setWallet, setSlug }) => {
  return (
    <>
      <h3 className="mb-3 ml-8">
        Component -
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <section className="pl-4 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Fetch NFTs Using
        <button
          className={`block my-4 px-6 py-1 shadow text-[18px] text-black border ${
            selectedItem?.wallet === "wallet" ? "border-black" : ""
          }`}
          onClick={() =>
            selectedItem?.wallet === "wallet"
              ? setWallet("")
              : setWallet("wallet")
          }
        >
          Connect Wallet
        </button>
        OR
        <div className="my-2 text-black">
          <label htmlFor="wallet-address" className="text-sm">
            Wallet Address
          </label>
          <input
            className="changeText"
            type="text"
            name="wallet-address"
            placeholder="address"
            value={
              selectedItem?.wallet !== "wallet" ? selectedItem?.wallet : ""
            }
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
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
            value={selectedItem?.slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
      </section>
    </>
  );
};

export default NftCardSettings;
