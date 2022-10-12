import { IContract } from "redux/contract/contract.interfaces";

export const getContainerList = () => {
    try {
        const contractList = localStorage.getItem("contractList");
        const newContract: IContract[] = JSON.parse(contractList);
        return newContract;
      } catch (error) {
        console.log(error, "error");
        return null;
      }
}