import { FC, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import BuilderConfig from "config";
import RenderItem from "utils/render-item";
import IItems from "interfaces/items";
import { IInput, IOutput } from "interfaces/value";

const ResponsiveGridLayout = WidthProvider(Responsive); // for responsive grid layout

const Home: FC = () => {
  const config = JSON.parse(BuilderConfig);
  const [inputValue, setInputValue] = useState<IInput[]>([]);
  const [outputValue, setOutputValue] = useState<IOutput[]>([]);
  const [testConfig, setTestConfig] = useState(
    JSON.parse(BuilderConfig).builder
  );
  // const [prev, setPrev] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [photos , setPhotos] = useState([])
    console.log(testConfig)

  // to persist layout changes
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    console.log(layout)
    let newItemsArr = layout.map((obj: IItems) => {
      let selectedItem = testConfig.filter(
        (item: IItems) => item.i === obj.i
      )[0];
      const { h, minW, x, y, w, i, minH } = obj;
      return (selectedItem = {
        ...selectedItem,
        h,
        minW,
        minH,
        x,
        y,
        w,
        i,
      });
    });

    newItemsArr.length > 0
      ? setTestConfig(newItemsArr)
      : setTestConfig(testConfig);
  };

  const handleClick = async () => {
    console.log(inputVal)


   
    fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${inputVal}&order_direction=desc&offset=0&limit=20&include_orders=false`,
      { method: "GET", headers: { Accept: "application/json" } }
    )
    .then( res => res.json() )
    .then( result => {
      console.log(result)
      let photosArr = result.assets.map(asset => {
        // let gridX = 0 , gridY = 0, gridW = 6
        // console.log(gridX, gridY)
        let newCI = {
          i: `${asset.id}`,
          x: 0,
          y: 1,
          h: 3,
          w: 6,
          name: "Image",
          imgData: `${asset.image_url}`,
          link: "",
          style: {
            backgroundColor: { r: "0", g: "0", b: "0" },
            color: { r: "0", g: "0", b: "0", a: "100" },
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            justifyContent: "center",
            fontSize: 15,
            deleteComponent: 0,
            margin: {
              marginTop: 10,
              marginRight: 0,
              marginBottom: 10,
              marginLeft: 0,
            },
            padding: {
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              paddingLeft: 0,
            },
          },
        };
        let newCT = {
          i: `${asset.id}text`,
          x: 0,
          y: 1,
          h: 1,
          w: 6,
          name: "Text",
          value: `${asset.name}`,
          link: "",
          style: {
            backgroundColor: { r: "44", g: "44", b: "44", a: 1 },
            color: { r: "228", g: "228", b: "228", a: "1" },
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            justifyContent: "center",
            fontSize: 29,
            deleteComponent: 0,
            margin: {
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
            },
            padding: {
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              paddingLeft: 0,
            },
          },
        }; 
        // gridY  
        // return newC
        let parentComponent = {
          children: [newCI, newCT],
          i: asset.id + "container",
          x: 0,
          y: 1,
          h: 6,
          w: 6,
          name: "Container",
          style: {
            backgroundColor: { r: "44", g: "44", b: "44", a: 1 },
            borderRadius: 6,
            borderWidth: 0,
            color: { r: "0", g: "0", b: "0", a: "100" },
            deleteComponent: 0,
            shadow: "none",
          },
        };
        return parentComponent
      })
      // let textArr = result.assets.map(text => {
      //   let gridX = 0 , gridY = 0, gridW = 6
      //   console.log(gridX, gridY)
      //   let newCT = {
      //     i: `${text.id}text`,
      //     x: 0,
      //     y: 1,
      //     h: 3,
      //     w: 6,
      //     name: "Text",
      //     imgData: `${text.name}`,
      //     link: "",
      //     style: {
      //       backgroundColor: { r: "44", g: "44", b: "44", a: 1 },
      //       color: { r: "228", g: "228", b: "228", a: "1" },
      //       fontWeight: "normal",
      //       fontStyle: "normal",
      //       textDecoration: "none",
      //       justifyContent: "center",
      //       fontSize: 29,
      //       deleteComponent: 0,
      //       margin: {
      //         marginTop: 10,
      //         marginRight: 0,
      //         marginBottom: 10,
      //         marginLeft: 0,
      //       },
      //       padding: {
      //         paddingTop: 0,
      //         paddingRight: 0,
      //         paddingBottom: 0,
      //         paddingLeft: 0,
      //       },
      //     },
      //   }; 
      //   return newC
      // })
      
      let newItemsArr = testConfig.map((item) => {
        const { y } = item;
        if (y >= photosArr[0].y) {
          return {
            ...item,
            y: y + photosArr.length*photosArr[0].h,
          };
        } else {
          return {
            ...item,
            y: y,
          };
        }
      });
      // console.log(photos, photosArr)
      // setTestConfig([...testConfig, ...newItemsArr]);
      setTestConfig([...newItemsArr, ...photosArr]);
    })
    .catch(err => console.log(err))
    // const abc = await result.json()
    // console.log(abc)
    console.log(testConfig)
  
    // let result = await fetchNft(inputVal)
    // console.log(result)
    // testConfig.builder

    // if(photos){
    //   let photosArr = photos.map(photo => {
    //     let newC = {
    //       i: `photo-${photo.albumId}-${photo.id}`,
    //       x: 0,
    //       y: 0,
    //       h: 1,
    //       w: 6,
    //       name: "Text",
    //       value: `${photo.title}`,
    //       link: "",
    //       style: {
    //         backgroundColor: { r: "0", g: "0", b: "0" },
    //         color: { r: "0", g: "0", b: "0", a: "100" },
    //         fontWeight: "normal",
    //         fontStyle: "normal",
    //         textDecoration: "none",
    //         justifyContent: "center",
    //         fontSize: 15,
    //         deleteComponent: 0,
    //         margin: {
    //           marginTop: 0,
    //           marginRight: 0,
    //           marginBottom: 0,
    //           marginLeft: 0,
    //         },
    //         padding: {
    //           paddingTop: 0,
    //           paddingRight: 0,
    //           paddingBottom: 0,
    //           paddingLeft: 0,
    //         },
    //       },
    //     };
    //     return newC
    //   })
    //   setPhotos(photosArr)
    // }
    // let newC = {
    //   i: "testing",
    //   x: 0,
    //   y: 0,
    //   h: 1,
    //   w: 3,
    //   name: "Text",
    //   value: "Testing...",
    //   link: "",
    //   style: {
    //     backgroundColor: { r: "0", g: "0", b: "0" },
    //     color: { r: "0", g: "0", b: "0", a: "100" },
    //     fontWeight: "normal",
    //     fontStyle: "normal",
    //     textDecoration: "none",
    //     justifyContent: "center",
    //     fontSize: 15,
    //     deleteComponent: 0,
    //     margin: {
    //       marginTop: 0,
    //       marginRight: 0,
    //       marginBottom: 0,
    //       marginLeft: 0,
    //     },
    //     padding: {
    //       paddingTop: 0,
    //       paddingRight: 0,
    //       paddingBottom: 0,
    //       paddingLeft: 0,
    //     },
    //   },
    // };

    // let newItemsArr = testConfig.map((item) => {
    //   // console.log(item)
    //   const { y } = item;
    //   return {
    //     ...item,
    //     y: y + newC.h,
    //   };
    // });
    // console.log(photos)

    // let newItemsArr = testConfig.map((item) => {
    //   const { y } = item;
    //   if (y >= newC.y) {
    //     return {
    //       ...item,
    //       y: y + newC.h,
    //     };
    //   } else {
    //     return {
    //       ...item,
    //       y: y,
    //     };
    //   }
    // });

    setTestConfig([...testConfig, ...photos]);
  };

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: `rgba(${config.background?.r}, ${config.background?.g}, ${config.background?.b}, ${config.background?.a})`,
      }}
    >
      <ResponsiveGridLayout
        layouts={{ lg: testConfig }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        isDraggable={false}
        isResizable={false}
        onLayoutChange={onLayoutChange}
        compactType={null}
        margin={[0, 0]}
        className="h-fit overflow-hidden"
      >
        {testConfig.map((c: IItems) => {
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
      <div>
        <input type='text' value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
        <button
          className="m-4 px-4 py-2 bg-purple-600 text-white rounded-full"
          onClick={handleClick}
        >
          Fetch
        </button>
      </div>
    </main>
  );
};

export default Home;