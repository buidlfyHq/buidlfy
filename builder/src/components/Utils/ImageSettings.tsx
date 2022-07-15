import React from "react";
import AlignComponent from "./AlignComponent";
import UtilitiesComponent from "./UtilitiesComponent";
import UploadComponent from "./UploadComponent";

const ImageSettings = (
  items,
  setItems,
  selectedItem,
  setDeleteComponent,
  deleteComponent,
  justifyContent,
  setLeft,
  setCenter,
  setRight,
  setPicture,
  setImgData,
  imgData,
) => {
  return (
    <>
      <h3 className="mb-3 ml-8">
        Component -{" "}
        {selectedItem ? (
          <span className="font-bold">{selectedItem.name}</span>
        ) : null}
      </h3>
      <UploadComponent
        setPicture={setPicture}
        setImgData={setImgData}
        imgData={imgData}
        selectedItem={selectedItem}
        items={items}
        setItems={setItems}
      />
      <AlignComponent
        justifyContent={justifyContent}
        setLeft={setLeft}
        setRight={setRight}
        setCenter={setCenter}
      />

      <UtilitiesComponent
        deleteComponent={deleteComponent}
        setDeleteComponent={setDeleteComponent}
      />
    </>
  );
};

export default ImageSettings;
