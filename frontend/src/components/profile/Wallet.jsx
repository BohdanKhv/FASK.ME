import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from '../../features/profile/profileSlice';
import { Modal, Image } from '../';
import { ethers } from 'ethers';
import jazzicon from '@metamask/jazzicon';
import { arrowRepeatIcon, closeIcon, linkIcon, shareIcon, walletIcon } from '../../constance/icons';


const Wallet = ({children, walletIsOpen, setWalletIsOpen}) => {
    const { user } = useSelector((state) => state.auth);
    const { isUpdating, msg } = useSelector((state) => state.profile);
    const ethPrice = useSelector((state) => state.local.ethPrice);
    const [err, setErr] = useState('');
    const [balance, setBalance] = useState('');
    const avatarRef = useRef()
    const dispatch = useDispatch();


    const handleConnectWallet = async () => {
        // Check if metamask is installed
        if (window.ethereum) {
            const wallets = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (wallets.length > 0) {
                setErr('');
                dispatch(connectWallet(wallets[0]));
            } else {
                setErr('Please install MetaMask');
            }
        } else {
            console.log('Metamask is not installed');
            setErr('Metamask is not installed');
        }
    }

    const getWalletInfo = async () => {
        const nodeUrl = `https://${process.env.REACT_APP_NET}.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
        const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
        const element = avatarRef.current;

        if (element && user.profile.wallet) {
            const addr = user.profile.wallet.slice(2, 10);
            const seed = parseInt(addr, 16);
            const icon = jazzicon(20, seed); //generates a size 20 icon
            if (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(icon);
        }

        try {
            const balance = await provider.getBalance(user.profile.wallet);
            setBalance(ethers.utils.formatEther(balance));
        } catch (err) {
            console.log(err);
        }
    }

    const chainChanged = (chainId) => {
        console.log('Chain was changed to: ', chainId);
    }

    useEffect(() => {
        if (user.profile.wallet && !isUpdating && walletIsOpen) {
            getWalletInfo();
        }

        if (window.ethereum) {
            const ethereum = window.ethereum;
            ethereum.on('chainChanged', (chainId) => {
                chainChanged(chainId);
            });
        }
        

        return () => {
            if(window.ethereum && !walletIsOpen) {
                const ethereum = window.ethereum;
                ethereum.removeListener('chainChanged', chainChanged);
            }
        }
    }, [walletIsOpen])
    

    return (
        <Modal
            setModalIsOpen={setWalletIsOpen}
            modalIsOpen={walletIsOpen}
            contentLabel={'Your Wallet'}
            footerNone
        >
            { user.profile.wallet ? (
                <>
                    <div className="flex align-between">
                        <p className="text-secondary title-4">Connected with MetaMask</p>
                        <div 
                            className="btn btn-xs btn-outline text-secondary spinner"
                            onClick={() => dispatch(connectWallet(''))}
                        >{isUpdating ? arrowRepeatIcon : 'Remove'}</div>
                    </div>
                    <div className="border p-2 mt-1">
                        <div className="flex my-1 align-between">
                            <div className="flex">
                                <div className="flex align-center" ref={avatarRef}></div>
                                <p 
                                    className="title-4 mx-3"
                                    title={ user.profile.wallet }
                                >
                                    {user.profile.wallet.slice(0,6)}...{user.profile.wallet.slice(-5, -1)}
                                </p>
                            </div>
                            <p className="title-4">
                                {balance.slice(0,5)} ETH
                            </p>
                        </div>
                        <div className="flex flex-end border-top pt-1">
                            <div 
                                className="btn btn-xs mr-1"
                                onClick={() => {
                                    navigator.clipboard.writeText(user.profile.wallet);
                                }}
                            >
                                Copy Address
                            </div>
                            <a 
                                href={`https://${process.env.REACT_APP_NET}.etherscan.io/address/${user.profile.wallet}`}
                                className="btn btn-xs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View On Explorer
                            </a>
                        </div>
                    </div>
                    <div className="flex my-1 align-between border p-2">
                        <p>
                            1 ETH = {ethPrice} USD
                        </p>
                        <p>
                            {(balance * ethPrice).toFixed(2)} USD
                        </p>
                    </div>
                </>
            ) : (
                <>
                <div 
                    className="btn spinner"
                    onClick={!isUpdating ? handleConnectWallet : null}
                >
                    {isUpdating && arrowRepeatIcon}<span>Connect MetaMask Wallet</span>
                </div>
                {err && (
                <>
                    <div className="bg-err my-1">{err}</div>
                    <a 
                        className="btn btn-primary opacity-1"
                        href="https://metamask.io/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setErr('')}
                    >
                        <span>Install Metamask</span>
                    </a>
                </>
                )}
                </>
            ) }
            {msg && (
                <div className="bg-err my-1">{msg}</div>
            )}
        </Modal>
    )
}

export default Wallet