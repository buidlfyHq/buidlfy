import { FC } from 'react';
import { useSelector } from 'react-redux';
import AlignComponent from 'components/settings/align-component';
import UploadComponent from 'components/settings/upload-component';
import MarginComponent from 'components/settings/margin-component';
import SizeComponent from 'components/settings/image-size-component';
import BackgroundSizeComponent from 'components/settings/background-size-component';
import { IRootState } from 'redux/root-state.interface';
import { ISettings, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { IoMdLink } from 'react-icons/io';

const ImageSettings: FC<ISettings> = ({ handleSettingChange }) => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
      <UploadComponent i={selectedElement.i} />
      <div className="flex items-center mt-4 mx-1 mb-4 w-[13.8rem] text-black">
        <div className="link-div px-1 py-1">
          <IoMdLink className="text-[18px]" />
        </div>
        <input
          value={selectedElement.link}
          onChange={e => handleSettingChange(e, 'link')}
          className="changeText pl-[2.5rem] py-[0.4rem] input-text"
          type="text"
          placeholder="Link"
        />
      </div>
      <AlignComponent i={selectedElement.i} justifyContent={selectedElement.style.justifyContent} />
      <SizeComponent
        i={selectedElement.i}
        width={selectedElement.style?.width}
        height={selectedElement.style?.height}
        manualSizing={selectedElement.style?.manualSizing}
      />
      <BackgroundSizeComponent i={selectedElement.i} backgroundSize={selectedElement.style?.backgroundSize} />
      <MarginComponent i={selectedElement.i} margin={selectedElement.style.margin} />
    </>
  );
};

export default ImageSettings;
