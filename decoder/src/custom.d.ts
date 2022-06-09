declare module "*.jpg";
declare module "*.png" {
    const value: any;
    export = value;
}
declare module "*.jpeg";
declare module "*.gif";