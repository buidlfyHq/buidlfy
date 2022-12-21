import { FC } from 'react';
import { useSelector } from 'react-redux';
import BgColorComponent from 'components/settings/bg-color-component';
import MarginComponent from 'components/settings/margin-component';
import { IRootState } from 'redux/root-state.interface';
import 'styles/components.css';

const SpacerSettings: FC = () => {
  const selectedElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
      <BgColorComponent i={selectedElement.i} elementBackgroundColor={selectedElement.style.backgroundColor} />
      <MarginComponent i={selectedElement.i} margin={selectedElement.style.margin} />
    </>
  );
};

export default SpacerSettings;
