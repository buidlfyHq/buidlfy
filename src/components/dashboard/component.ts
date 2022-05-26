import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();
export const components = [
  {
    id: uid(),
    name: "Container",
  },
  {
    id: uid(),
    name: "Button",
  },
  {
    id: uid(),
    name: "Text",
  },
  {
    id: uid(),
    name: "Link",
  },
  {
    id: uid(),
    name: "Heading 1",
  },
  {
    id: uid(),
    name: "Heading 2",
  },
  {
    id: uid(),
    name: "Heading 3",
  },
  {
    id: uid(),
    name: "Input",
  },
  {
    id: uid(),
    name: "Image",
  },
  {
    id: uid(),
    name: "Divider"
  }
];
