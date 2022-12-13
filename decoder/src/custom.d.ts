declare module "*.jpg";
declare module "*.png" {
  const value: any; // required
  export = value;
}
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
