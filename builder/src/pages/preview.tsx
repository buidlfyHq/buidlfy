import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import RenderItem from 'components/utils/render-item';
import { IRootState } from 'redux/root-state.interface';
import { useEffect } from 'react';
import { setSiteHead, updateWorkspaceBackgroundColor, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { updateContractAbi, updateContractAddress, updateContractNetwork } from 'redux/contract/contract.reducers';

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Preview = () => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const workspaceBackgroundColor = useSelector((state: IRootState) => state.workspace.workspaceBackgroundColor);

  useEffect(() => {
    // load stored configs if available
    let saveItems = localStorage.getItem('items');
    if (saveItems) {
      dispatch(updateWorkspaceElementsArray(JSON.parse(saveItems).value));
      dispatch(updateWorkspaceBackgroundColor(JSON.parse(saveItems).backgroundColor));
      dispatch(setSiteHead(JSON.parse(saveItems).head));
      if (JSON.parse(saveItems).contract) {
        dispatch(updateContractAbi(JSON.stringify(JSON.parse(saveItems).contract?.abi)));
        dispatch(updateContractAddress(JSON.parse(saveItems).contract?.address));
        dispatch(updateContractNetwork(JSON.parse(saveItems).contract?.network));
      }
    }
  }, []); // eslint-disable-line

  return (
    <main
      className="min-h-screen"
      style={{
        background: workspaceBackgroundColor,
      }}
    >
      <ResponsiveGridLayout
        layouts={{ lg: workspaceElements }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        isDraggable={false}
        isResizable={false}
        compactType={null}
        margin={[0, 0]}
        className="h-fit overflow-hidden"
      >
        {workspaceElements.map(c => {
          const { x, y, w, h, minW, i } = c;
          return (
            <div key={i} data-grid={{ x, y, w, h, minW }}>
              <RenderItem item={c} preview />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </main>
  );
};

export default Preview;
