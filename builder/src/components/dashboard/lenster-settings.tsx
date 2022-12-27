import { FC } from 'react';
import { useSelector } from 'react-redux';
import AddLensterComponent from 'components/settings/add-lenster-component';
import DuplicateComponent from 'components/settings/duplicate-component';
import { IRootState } from 'redux/root-state.interface';
import 'styles/components.css';

const LensterSettings: FC = () => {
  const selectedElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  return (
    <section id={selectedElement.i}>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
      <AddLensterComponent i={selectedElement.i} />
      <DuplicateComponent />
    </section>
  );
};

export default LensterSettings;
