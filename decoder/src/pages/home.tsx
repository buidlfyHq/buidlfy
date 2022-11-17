import { FC, useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Contract } from "ethers";
import BuilderConfig from "config";
import { onLoad } from "hooks/on-load";
import RenderItem from "utils/render-item";
import { onRequest } from "hooks/on-request";
import IWorkspace from "interfaces/workspace";
import { IInput, IOutput } from "interfaces/value";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (config.contract.abi !== [] && config.contract.address !== "") {
      setContract(onLoad(config));
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (contract) {
      onResponse();
    }
  }, [contract]);

  const contractFunction = {
    methodName: "getInt", // user selected output type from config
    stateMutability: "view", // constant for oracle
    inputs: [{ id: "iexec", send: false }], // fake input
    outputs: [{ id: "FOkcPu" }], // user selected output from config
  };

  // config: {
  //   oracle: {
  //     id: 0x22,
  //     methodName: '',
  //     outputId: ''
  //   }
  // }

  const onResponse = async () => {
    const res = await onRequest(
      "getInt",
      contractFunction,
      contract,
      [
        {
          id: "iexec",
          value:
            "0x5884cf2a2d1bf4f50ab2c3bfb6e0b7e9c9044507b3302254336bf4551008720b",
        },
      ],
      [],
      () => {},
      () => {}
    );
    setOutputValue(res ? res[0] : []);
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background: config.background,
      }}
    >
      <ResponsiveGridLayout
        layouts={config.builder}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        isDraggable={false}
        isResizable={false}
        compactType={null}
        margin={[0, 0]}
        className="h-fit overflow-hidden"
      >
        {config.builder.map((c: IWorkspace) => {
          const { x, y, w, h, minW, i } = c;
          return (
            <div key={i} data-grid={{ x, y, w, h, minW }}>
              <RenderItem
                item={c}
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

export default Home;
