import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Modal } from '../';
import { starFillIcon, starEmptyIcon } from '../../constance/icons';
import { createTransaction } from '../../features/transaction/transactionSlice';
import { ethers } from 'ethers';


const Premium = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [metamaskErr, setMetamaskErr] = useState('');
    const { user } = useSelector(state => state.auth);
    const { profile } = useSelector(state => state.profile);
    const { isLoading } = useSelector(state => state.transaction);
    const { ethPrice } = useSelector(state => state.local);


    const handleTransaction = async (days) => {
        setMetamaskErr('');

        // Check if user has connected metamask account
        if(!user.profile.wallet) {
            setMetamaskErr('Please connect your metamask account');
            return;
        }

        // Check if metamask is installed
        if (!window.ethereum) {
            setMetamaskErr('Metamask is not installed');
            console.log('Metamask is not installed');
            return;
        }

        const senderWallet = user.profile.wallet;
        const receiverWallet = profile.wallet;

        const ethereum = window.ethereum;

        await ethereum.enable();

        const provider = new ethers.providers.Web3Provider(ethereum);

        const params = [{
            from: senderWallet,
            to: receiverWallet,
            value: ethers.utils.parseEther((days / 30 * profile.premium), 'ether').toHexString()
        }]

        const transactionHash = await provider.send('eth_sendTransaction', params);

        dispatch(createTransaction({
            receiver: profile.user._id,
            senderWallet,
            receiverWallet,
            premiumDays: days,
            amount: (days / 30 * profile.premium),
            transactionHash,
        }));
        console.log(transactionHash);
    }

    useEffect(() => {
        return () => {
            setIsOpen(false);
            setMetamaskErr('');
        }
    }, [])


    return (
        <>
        <Modal
            modalIsOpen={isOpen}
            setModalIsOpen={setIsOpen}
            isLoading={isLoading}
            contentLabel="Get Premium"
            footerNone
        >
            {profile.isPremium ? (
                <p>
                    You are already a premium user. Your premium will expire on {new Date(profile.exprDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
            ) : (
                <>
                <div className="mb-1">
                    <small>
                        Premium lets you ask as many questions as you want and the ability to see premium answers.
                    </small>
                </div>
                <div className="btn btn-sm mb-1"
                    onClick={() => {
                        handleTransaction(30)
                    }}
                >
                    1 Moth {profile.premium} ETH = {(profile.premium * ethPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                <div className="btn btn-sm mb-1"
                    onClick={() => {
                        handleTransaction(90)
                    }}
                >
                    3 Moth {profile.premium} ETH = {(profile.premium * ethPrice * 3).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                <div className="btn btn-sm mb-1"
                    onClick={() => {
                        handleTransaction(180)
                    }}
                >
                    6 Moth {profile.premium} ETH = {(profile.premium * ethPrice * 6).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                <div className="btn btn-sm"
                    onClick={() => {
                        handleTransaction(360)
                    }}
                >
                    12 Moth {profile.premium} ETH = {(profile.premium * ethPrice * 12).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                {metamaskErr && (
                    <>
                    <div className="bg-err my-1">
                        {metamaskErr}
                    </div>
                    {metamaskErr === 'Metamask is not installed' && (
                        <a 
                            className="btn btn-sm btn-primary"
                            href="https://metamask.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download Metamask
                        </a>
                    )}
                    {metamaskErr === 'Please connect your metamask account' && (
                        <div 
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                                setIsOpen(false);
                                setMetamaskErr('');
                                document.getElementById('wallet').click();
                            }}
                        >
                            Connect your metamask account
                        </div>
                    )}
                    </>
                )}
                </>
            )}
        </Modal>
        <Tooltip
            classList={'mr-1'}
            content={profile.isPremium ?
                `Your premium expires on ${new Date(profile.exprDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`
            : 'Become a premium member'}
        >
            <div 
                className="btn-icon"
                onClick={() => setIsOpen(true)}
            >
                {profile.isPremium ? starFillIcon : starEmptyIcon}
            </div>
        </Tooltip>
        </>
    )
}

export default Premium