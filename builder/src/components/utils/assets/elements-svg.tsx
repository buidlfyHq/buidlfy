import "styles/components.css";

const ElementSvg = () => {
  return (
    <div className="side-icon w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-full mt-5">
      <svg
        width="20"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="element-svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.0768 13.5713L2.09067 9.3373C0.636444 8.56619 0.636444 6.48276 2.09067 5.71055L10.0768 1.47768C11.2802 0.840773 12.719 0.840773 13.9224 1.47768L21.9086 5.71055C23.3639 6.48276 23.3639 8.56619 21.9086 9.3373L13.8652 13.6274C12.664 14.2654 11.2802 14.2082 10.0768 13.5713Z"
          stroke="#8484AA"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          className="element-svg"
          d="M21.9086 14.6617C23.3639 15.4328 23.3639 17.5184 21.9086 18.2895L13.9224 22.5224C12.719 23.1593 11.2802 23.1593 10.0768 22.5224L2.09067 18.2895C0.636444 17.5184 0.636444 15.4328 2.09067 14.6617"
          stroke="#8484AA"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};

export default ElementSvg;
