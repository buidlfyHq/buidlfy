import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();
export const components = [
  {
    id: uid(),
    name: "Container",
    h:1.5
  },
  {
    id: uid(),
    name: "Button",
    h:1
  },
  {
    id: uid(),
    name: "Text",
    h:1
  },
  {
    id: uid(),
    name: "Link",
    h:1
  },
  {
    id: uid(),
    name: "Heading 1",
    h:2
  },
  {
    id: uid(),
    name: "Heading 2",
    h:2
  },
  {
    id: uid(),
    name: "Heading 3",
    h:2
  },
  {
    id: uid(),
    name: "Input",
    h:1
  },
  {
    id: uid(),
    name: "Image",
    h:3
  },
  {
    id: uid(),
    name: "Divider",
    h:1
  }
];
