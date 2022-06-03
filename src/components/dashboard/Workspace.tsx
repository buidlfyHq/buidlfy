import React, { FC } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
// import AbiComponent from "./AbiComponent";
import WorkspaceNavbar from "./WorkspaceNavbar";
import RenderItem from "./RenderItem";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Workspace: FC<{
  abi: string;
  showComponent: number[];
  setShowComponent: any;
  items: any;
  setItems: any;
  className: string;
}> = ({ abi, showComponent, setShowComponent, items, setItems, className }) => {
  // on layout change
  const onLayoutChange = (layout, layouts) => {
    console.log(layout, layouts);
    let newItemsArr = layout.map((obj: any) => {
      let selectedItem = items.filter((item) => item.id === obj.i)[0];
      const { h, minW, x, y, w, i } = obj;
      return (selectedItem = {
        name: selectedItem.name,
        h,
        minW,
        x,
        y,
        w,
        id: i,
      });
    });
    newItemsArr.length > 0 ? setItems(newItemsArr) : setItems(items);
    // console.log(layout, layouts)
  };

  return (
    <main
      className={
        className === ""
          ? `fixed ml-[250px] mt-[60px] h-full w-[calc(100%-250px)] h-[calc(100%-60px)]`
          : `w-full`
      }
    >
      <WorkspaceNavbar />
      <section className="p-4">
        Welcome to DeFlow
        {/* <AbiComponent
          abi={abi}
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        /> */}
        <ResponsiveGridLayout
          layouts={{ lg: items }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          width={window.innerWidth - 250}
          compactType="horizontal"
          resizeHandles={["nw", "se"]}
          onLayoutChange={onLayoutChange}
        >
          {items?.map((item, i) => {
            const { x, y, w, h, minW, id } = item;
            console.log("item", item);
            return (
              <div
                key={id}
                data-grid={{ x, y, w, h, minW }}
                className="justify-center transition-colors duration-150 ease-in-out rounded-lg hover:outline-slate-300 hover:outline-dashed"
              >
                <RenderItem item={item} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </section>
    </main>
  );
};

export default Workspace;
