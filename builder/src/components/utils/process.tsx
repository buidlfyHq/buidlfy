import one from "assets/icons/waiting-1.svg";
import two from "assets/icons/waiting-2.svg";
import three from "assets/icons/waiting-3.svg";
import four from "assets/icons/waiting-4.svg";
import five from "assets/icons/waiting-5.svg";
import six from "assets/icons/waiting-6.svg";

export const processes = [
  {
    name: "Initiate Deployment",
    className: "",
    idleImage: one,
    stepNumber: 1,
    lineDiv: (
      <div className="bg-[#c1c1c1] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    completedLine: (
      <div className="bg-[#9768FB] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    failedText: "Initiate Deployment",
  },
  {
    name: "Preparing Environment",
    className: "",
    idleImage: two,
    stepNumber: 2,
    lineDiv: (
      <div className="bg-[#c1c1c1] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    completedLine: (
      <div className="bg-[#9768FB] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    failedText: "Preparing Environment",
  },
  {
    name: "Publishing Site",
    className: "",
    idleImage: three,
    stepNumber: 3,
    lineDiv: (
      <div className="bg-[#c1c1c1] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    completedLine: (
      <div className="bg-[#9768FB] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    failedText: "Publishing Site",
  },
  {
    name: "Site Published",
    className: "",
    idleImage: four,
    stepNumber: 4,
    lineDiv: (
      <div className="bg-[#c1c1c1] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    completedLine: (
      <div className="bg-[#9768FB] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    failedText: "Deployment Failed, Please try Again",
  },
  {
    name: "Assigning Buidlfy Subdomain",
    className: "",
    idleImage: five,
    stepNumber: 5,
    lineDiv: (
      <div className="bg-[#c1c1c1] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    completedLine: (
      <div className="bg-[#9768FB] w-[2px] ml-[11.4px] h-[45px] my-[2px]"></div>
    ),
    failedText: "Assigning Buidlfy Subdomain",
  },
  {
    name: "Verifying Site",
    className: "",
    idleImage: six,
    stepNumber: 6,
    lineDiv: <></>,
    completedLine: <></>,
    failedText: "Publish Failed, Please try Again",
  },
];
