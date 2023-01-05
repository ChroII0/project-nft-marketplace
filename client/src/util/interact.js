import { ethers } from "ethers";


export const connectWallet = async () => {
    if (window.ethereum) {
        const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (res[0])
        {
            return true;
        }
    } else {
        alert("install metamask extension!!")
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        const res = await window.ethereum.request({ method: 'eth_accounts' });
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [res[0], 'latest']
        });
        return {
            address: res[0],
            balance: ethers.utils.formatEther(balance)
        }
    } else {
        alert("install metamask extension!!")
    }
};

