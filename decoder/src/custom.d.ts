declare module "*.jpg";
declare module "*.png" {
    const value: any; // required
    export = value;
}
declare module "*.jpeg";
declare module "*.gif";