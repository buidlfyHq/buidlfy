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
  backgroundColor: "rgba(255, 255, 255, 0)",
  color: "rgba(0, 0, 0, 100)",
}

const defaultFontStyles = {
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  justifyContent: "center",
};

const defaultDeleteStyles = {
  deleteComponent: false,
};

const defaultBorderStyles = {
  borderRadius: 0,
  borderWidth: 0,
  shadow: "none",
};

export const components = [
  {
    name: "Container",
    h: 2,
    // minH: 2,
    style: {
      ...defaultPaddingStyles,
      ...defaultMarginStyles,
      backgroundColor: "rgba(255, 255, 255, 0)",
      color: "rgba(0, 0, 0, 1)",
      backgroundSize: "contain",
      ...defaultDeleteStyles,
      ...defaultBorderStyles,
    },
    children: [],
  },
  // {
  //   name: "Horizontal Container",
  //   h: 4,
  //   style: {
  //     ...defaultDeleteStyles,
  //     ...defaultColorStyles,
  //     ...defaultBorderStyles,
  //   },
  //   children: [
  //     {
  //       name: "Image",
  //       h: 4,
  //       i: 1,
  //       y: 0,
  //       x: 0,
  //       w: 3,
  //       style: {
  //         ...defaultDeleteStyles,
  //         ...defaultFontStyles,
  //         ...defaultMarginStyles
  //       },
  //     },
  //     {
  //       name: "Text",
  //       h: 2,
  //       i: 3,
  //       y: 0,
  //       x: 3,
  //       w: 3,
  //       value: "Card Paragraph",
  //       link: "",
  //       style: {
  //         ...defaultColorStyles,
  //         ...defaultFontStyles,
  //         fontSize: 15,
  //         ...defaultDeleteStyles,
  //         ...defaultMarginStyles,
  //         ...defaultPaddingStyles
  //       },
  //     },
  //     {
  //       name: "Heading 1",
  //       h: 2,
  //       i: 2,
  //       y: 0,
  //       x: 3,
  //       w: 3,
  //       value: "Card Title",
  //       link: "",
  //       style: {
  //         ...defaultColorStyles,
  //         ...defaultFontStyles,
  //         fontSize: 25,
  //         ...defaultDeleteStyles,
  //         ...defaultMarginStyles,
  //         ...defaultPaddingStyles
  //       },
  //     },
     
  //   ],
  // },
  // {
  //   name: "Vertical Container",
  //   h: 5,
  //   style: {
  //     ...defaultDeleteStyles,
  //     ...defaultColorStyles,
  //     ...defaultBorderStyles,
  //   },

  //   children: [
  //     {
  //       name: "Image",
  //       h: 2,
  //       i: 4,
  //       w: 6,
  //       x: 0,
  //       y: 0,
  //       style: {
  //         ...defaultDeleteStyles,
  //         ...defaultFontStyles,
  //         ...defaultMarginStyles,
  //       },
  //     },
  //     {
  //       name: "Heading 1",
  //       h: 1,
  //       i: 5,
  //       w: 6,
  //       x: 0,
  //       y: 2,
  //       value: "Card Title",
  //       link: "",
  //       style: {
  //         ...defaultColorStyles,
  //         ...defaultFontStyles,
  //         fontSize: 25,
  //         ...defaultDeleteStyles,
  //         ...defaultMarginStyles,
  //         ...defaultPaddingStyles
  //       },
  //     },
  //     {
  //       name: "Text",
  //       h: 2,
  //       i: 6,
  //       w: 6,
  //       x: 0,
  //       y: 3,
  //       value: "Card Paragraph",
  //       link: "",
  //       style: {
  //         ...defaultColorStyles,
  //         ...defaultFontStyles,
  //         fontSize: 15,
  //         ...defaultDeleteStyles,
  //         ...defaultMarginStyles,
  //         ...defaultPaddingStyles
  //       },
  //     },
  //   ],
  // },
  {
    name: "Button",
    h: 1,
    minH: 1,
    value: "Add Button",
    link: "",
    style: {
      ...defaultColorStyles,
      ...defaultFontStyles,
      fontSize: 13,
      backgroundColor: "rgba(106, 88, 231, 100)",
      color: "rgba(255,255,255,100)",
      borderColor: "rgba(106, 88, 231, 100)",
      ...defaultDeleteStyles,
      borderRadius: 2,
      borderWidth: 0,
      ...defaultMarginStyles,
      padding: {
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
    connectWallet: false,
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
      borderRadius: 5,
      borderColor: "rgba(222,222,222,100)",
      color: "rgba(0,0,0,100)",
      backgroundColor: "rgba(255, 255, 255, 0)",
      margin: {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 0,
        marginBottom: 0,
      },
      padding: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8
      }
    },
  },
  {
    name: "Image",
    h: 3,
    minH: 1,
    style: {
      width: 80,
      height: 60,
      backgroundSize: "contain",
      isAuto: true,
      ...defaultDeleteStyles,
      ...defaultFontStyles,
      ...defaultMarginStyles,
    },
  },
  // {
  //   name: "Divider",
  //   h: 1,
  //   style: {
  //     ...defaultDeleteStyles,
  //   },
  // },

];
