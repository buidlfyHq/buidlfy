import { useSelector } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import RenderItem from "components/utils/render-item";
import { IRootState } from "redux/root-state.interface";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Preview = () => {
  const workspaceElements = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const workspaceBackgroundColor = useSelector(
    (state: IRootState) => state.workspace.workspaceBackgroundColor
  );

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
        {workspaceElements.map((c) => {
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
