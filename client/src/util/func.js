import { ethers } from "ethers";

export const formatRes = (res) => {
    const listObj = [];
    for (let i = 0; i < res.length; i++) {
        const iterator = Object.keys(res[i]);
        const item = []
        for (let j = (iterator.length / 2); j < iterator.length; j++) {
            const value = (typeof(res[i][iterator[j]]) === "object" && iterator[j] !== "_tokenURIDetail")
            ? (iterator[j] === "_price"
            ? ethers.utils.formatUnits(res[i][iterator[j]], 0)
            : parseInt(ethers.utils.formatUnits(res[i][iterator[j]], 0)))
            : (iterator[j] === "_tokenURIDetail"
            ? formatRes([res[i][iterator[j]]])
            : res[i][iterator[j]]
            );
            item[j - iterator.length / 2] = [iterator[j], value]
        }
        const entries = new Map(item);
        const obj = Object.fromEntries(entries);
        listObj[i] = obj;
    }
    return listObj;
}