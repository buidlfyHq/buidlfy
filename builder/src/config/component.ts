// Required NFT components
// NFT Image
// NFT Title
// NFT Price

const defaultMarginStyles = {
  margin: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
};

const defaultPaddingStyles = {
  padding: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
};

const defaultColorStyles = {
  backgroundColor: { r: "0", g: "0", b: "0" },
  color: { r: "0", g: "0", b: "0", a: "100" },
};

const defaultFontStyles = {
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  justifyContent: "center",
};

const defaultDeleteStyles = {
  deleteComponent: 0,
};

const defaultBorderStyles = {
  borderRadius: 0,
  borderWidth: 0,
  shadow: "none",
};

export const components = [
  // Basic Components
  {
    name: "Container",
    h: 2,
    minH: 2,
    style: {
      ...defaultDeleteStyles,
      ...defaultColorStyles,
      ...defaultBorderStyles,
    },
    children: [],
  },
  {
    name: "Horizontal Container",
    h: 4,
    style: {
      ...defaultDeleteStyles,
      ...defaultColorStyles,
      ...defaultBorderStyles,
    },
    children: [
      {
        name: "Image",
        h: 4,
        i: 1,
        y: 0,
        x: 0,
        w: 3,
        style: {
          ...defaultDeleteStyles,
          ...defaultFontStyles,
          ...defaultMarginStyles,
        },
      },
      {
        name: "Text",
        h: 2,
        i: 3,
        y: 0,
        x: 3,
        w: 3,
        value: "Card Paragraph",
        link: "",
        style: {
          ...defaultColorStyles,
          ...defaultFontStyles,
          fontSize: 15,
          ...defaultDeleteStyles,
          ...defaultMarginStyles,
          ...defaultPaddingStyles,
        },
      },
      {
        name: "Heading 1",
        h: 2,
        i: 2,
        y: 0,
        x: 3,
        w: 3,
        value: "Card Title",
        link: "",
        style: {
          ...defaultColorStyles,
          ...defaultFontStyles,
          fontSize: 25,
          ...defaultDeleteStyles,
          ...defaultMarginStyles,
          ...defaultPaddingStyles,
        },
      },
    ],
  },
  {
    name: "Vertical Container",
    nft: true,
    h: 6,
    style: {
      ...defaultDeleteStyles,
      ...defaultColorStyles,
      ...defaultBorderStyles,
    },

    children: [
      {
        name: "Image",
        h: 5,
        i: 4,
        w: 6,
        x: 0,
        y: 0,
        style: {
          ...defaultDeleteStyles,
          ...defaultFontStyles,
          ...defaultMarginStyles,
        },
      },
      {
        name: "Text",
        h: 1,
        i: 5,
        w: 6,
        x: 0,
        y: 5,
        value: "Card Title",
        link: "",
        style: {
          ...defaultColorStyles,
          ...defaultFontStyles,
          fontSize: 25,
          ...defaultDeleteStyles,
          ...defaultMarginStyles,
          ...defaultPaddingStyles,
        },
      },
    ],
  },
  {
    name: "Button",
    h: 1,

    minH: 1,
    value: "Add Button",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 15,
      ...defaultDeleteStyles,
      ...defaultBorderStyles,
      ...defaultMarginStyles,
      padding: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    connectWallet: "off",
    contract: {},
  },
  {
    name: "Text",
    h: 1,
    minH: 1,
    value: "Text",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 15,
      ...defaultDeleteStyles,
      ...defaultMarginStyles,
      ...defaultPaddingStyles,
    },
  },
  {
    name: "Heading 1",
    h: 1,
    minH: 1,
    value: "Heading 1",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 30,
      ...defaultDeleteStyles,
      ...defaultMarginStyles,
      ...defaultPaddingStyles,
    },
  },
  {
    name: "Heading 2",
    h: 1,
    minH: 1,
    value: "Heading 2",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 24,
      ...defaultDeleteStyles,
      ...defaultMarginStyles,
      ...defaultPaddingStyles,
    },
  },
  {
    name: "Heading 3",
    h: 1,
    minH: 1,
    value: "Heading 3",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 18.2,
      ...defaultDeleteStyles,
      ...defaultMarginStyles,
      ...defaultPaddingStyles,
    },
  },
  {
    name: "Input",
    h: 1,
    minH: 1,
    placeholder: 'Placeholder',
    style: {
      ...defaultDeleteStyles,
      ...defaultBorderStyles,
      ...defaultColorStyles,
      margin: {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
  {
    name: "Image",
    h: 1.2,
    minH: 1.2,
    style: {
      ...defaultDeleteStyles,
      ...defaultFontStyles,
      ...defaultMarginStyles,
    },
  },
  {
    name: "Divider",
    h: 1,
    minH: 1,
    style: {
      ...defaultDeleteStyles,
    },
  },
  // NFT Components
  {
    name: "NFT Container",
    nft: true,
    columns: 3,
    h: 6,
    style: {
      ...defaultDeleteStyles,
      ...defaultColorStyles,
      ...defaultBorderStyles,
    },

    children: [
      {
        name: "Image",
        h: 5,
        i: 4,
        w: 6,
        x: 0,
        y: 0,
        style: {
          ...defaultDeleteStyles,
          ...defaultFontStyles,
          ...defaultMarginStyles,
        },
      },
      {
        name: "Text",
        h: 1,
        i: 5,
        w: 6,
        x: 0,
        y: 5,
        value: "Card Title",
        link: "",
        style: {
          ...defaultColorStyles,
          ...defaultFontStyles,
          fontSize: 25,
          ...defaultDeleteStyles,
          ...defaultMarginStyles,
          ...defaultPaddingStyles,
        },
      },
    ],
  },
  {
    name: "NFT Image",
    nftItem: true,
    h: 1.2,
    minH: 1.2,
    style: {
      ...defaultDeleteStyles,
      ...defaultFontStyles,
      ...defaultMarginStyles,
    },
  },
  {
    name: "NFT Title",
    nftItem: true,
    h: 1,
    minH: 1,
    value: "NFT Title",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 18.2,
      ...defaultDeleteStyles,
      ...defaultMarginStyles,
      ...defaultPaddingStyles,
    },
  },
  {
    name: "NFT Price",
    nftItem: true,
    h: 1,
    minH: 1,
    value: "NFT Price",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 30,
      ...defaultDeleteStyles,
      ...defaultMarginStyles,
      ...defaultPaddingStyles,
    },
  },
];
