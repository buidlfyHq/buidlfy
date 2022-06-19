module.exports = {
  builder: [
    {
      h: 1,
      i: "XgVIMW",
      link: "",
      minW: 1,
      name: "Text",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "bold",
        justifyContent: "left",
        textDecoration: "none",
      },
      value: "DeFlow",
      w: 3,
      x: 0,
      y: 0,
    },
    {
      h: 1,
      i: "F1sL1Z",
      link: "",
      minW: 1,
      name: "Text",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "normal",
        justifyContent: "center",
        textDecoration: "underline",
      },
      value: "Home About Contact",
      w: 4,
      x: 3,
      y: 0,
    },
    {
      h: 1,
      i: "50TOAP",
      link: "",
      minW: 1,
      name: "Button",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "Connect Wallet",
      w: 3,
      x: 7,
      y: 0,
    },
    {
      h: 2,
      i: "3xSvTp",
      link: "",
      minW: 1,
      name: "Input",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 30,
        fontStyle: "normal",
        fontWeight: "normal",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "",
      w: 5,
      x: 5,
      y: 1,
      contract: { name: "createCampaign", inputName: "input1" },
    },
    {
      h: 1,
      i: "9IxD0t",
      link: "",
      minW: 1,
      name: "Heading 1",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "bold",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "DeFlow",
      w: 5,
      x: 0,
      y: 2,
    },
    {
      h: 1,
      i: "BIfwYY",
      link: "",
      minW: 1,
      name: "Input",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "normal",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "",
      w: 5,
      x: 0,
      y: 1,
      contract: { name: "createCampaign", inputName: "input0" },
    },
    {
      h: 1,
      i: "N6x26q",
      link: "",
      minW: 1,
      name: "Button",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "bold",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "Get Started ->",
      w: 10,
      x: 0,
      y: 3,
      contract: {
        name: "getDeployedCampaigns",
        stateMutability: "view",
        inputs: [],
        outputs: ["output0"],
      },
    },
    {
      h: 1,
      i: "RJlOw7",
      link: "",
      minW: 1,
      name: "Text",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "bold",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "Waiting for response...",
      w: 5,
      x: 5,
      y: 4,
      contract: { name: "createCampaign", outputName: "output0" },
    },
    {
      h: 1,
      i: "YPRyuN",
      link: "",
      minW: 1,
      name: "Text",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "bold",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "Text with Row span 1",
      w: 5,
      x: 0,
      y: 6,
    },
    {
      h: 2,
      i: "RC4gKh",
      link: "",
      minW: 1,
      name: "Heading 1",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "normal",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "Heading with Row span 2",
      w: 5,
      x: 5,
      y: 5,
    },
    {
      h: 2,
      i: "H7YEPO",
      link: "",
      minW: 1,
      name: "Heading 1",
      styles: {
        color: { r: "0", g: "0", b: "0", a: "100" },
        deleteComponent: 0,
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "normal",
        justifyContent: "center",
        textDecoration: "none",
      },
      value: "Heading with Row span 2",
      w: 5,
      x: 0,
      y: 4,
    },
  ],
  contract: {
    abi: [
      {
        inputs: [{ internalType: "uint256", name: "minimum", type: "uint256" }],
        name: "createCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "deployedCampaigns",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getDeployedCampaigns",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    address: "0x73ba4B6A58C67C70281C17aC23893b7BD4c8897E",
    functionName: [
      "createCampaign",
      "deployedCampaigns",
      "getDeployedCampaigns",
    ],
  },
};
