import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import config from 'config';
import RenderItem from 'components/utils/render-item';
import { signout } from 'utils/signout';
import { setSiteHead, updateWorkspaceBackgroundColor, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { updateContractAbi, updateContractAddress, updateContractNetwork } from 'redux/contract/contract.reducers';
import { fetchWalletDetailsAsync } from 'redux/web3/web3.thunk-actions';
import { IRootState } from 'redux/root-state.interface';
import { IInput, IOutput } from 'redux/workspace/workspace.interfaces';

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Preview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const workspaceBackgroundColor = useSelector((state: IRootState) => state.workspace.workspaceBackgroundColor);

  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);

  useEffect(() => {
    const session: any = JSON.parse(localStorage.getItem('session'));
    if (session) {
      // signout if sesssion is expired
      if (new Date(session.cookie?.expires) < new Date()) {
        signout();
        navigate('/');
      }
      // check if user is authorised
      fetch(`${config.server.SERVER}/user-status`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.nonce}`,
        },
        credentials: 'include',
      })
        .then(res => res.text())
        .then(res => {
          if (!JSON.parse(res).whitelisted) {
            signout();
            navigate('/');
          } else {
            // load stored configs if available
            const session: any = JSON.parse(localStorage.getItem('session'));
            if (session) {
              dispatch(fetchWalletDetailsAsync(session.data?.address));
            }
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
          }
        })
        .catch(() => {
          signout();
          navigate('/');
        });
    } else {
      signout();
      navigate('/');
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
        compactType="vertical"
        margin={[0, 0]}
        className="h-fit overflow-hidden"
      >
        {workspaceElements.map(c => {
          const { x, y, w, h, minW, i } = c;
          return (
            <div key={i} data-grid={{ x, y, w, h, minW }} className="cursor-default">
              <RenderItem
                item={c}
                preview
                inputValue={inputValue}
                setInputValue={setInputValue}
                outputValue={outputValue}
                setOutputValue={setOutputValue}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </main>
  );
};

export default Preview;
