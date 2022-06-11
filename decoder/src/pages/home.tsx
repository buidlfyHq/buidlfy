import { FC } from "react";
import config from "../config";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  return (
    <section className="p-4">
      <ResponsiveGridLayout
        layouts={config.builder}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        width={window.innerWidth - 250}
        compactType="horizontal"
        isDraggable={false}
        isResizable={false}
      >
        {config.builder.map((c) => {
          const { x, y, w, h, minW, i } = c;
          return (
            <div
              key={i}
              data-grid={{ x, y, w, h, minW }}
              style={{
                fontWeight: c.styles.fontWeight,
                fontStyle: c.styles.fontStyle,
                textDecoration: c.styles.textDecoration,
                color: `rgba(${c.styles.color.r}, ${c.styles.color.g}, ${c.styles.color.b}, ${c.styles.color.a})`,
                display: "flex",
                justifyContent: c.styles.justifyContent,
                fontSize: `${c.styles.fontSize}px`,
                gridColumn: `span ${c.w} / span ${c.w}`,
                height: `${c.h * 48}px`,
              }}
            >
              {c.value}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </section>
  );
};

export default Home;
