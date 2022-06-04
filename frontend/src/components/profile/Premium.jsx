import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Modal } from '../';
import { starFillIcon, starEmptyIcon, arrowRepeatIcon } from '../../constance/icons';
import { createTransaction } from '../../features/transaction/transactionSlice';
import { ethers } from 'ethers';


const Premium = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isMining, setIsMining] = useState(false);
    const [metamaskErr, setMetamaskErr] = useState('');
    const { user } = useSelector(state => state.auth);
    const { profile } = useSelector(state => state.profile);
    const { isLoading, isSuccess, transactions } = useSelector(state => state.transaction);
    const { ethPrice } = useSelector(state => state.local);


    const handleTransaction = async (days) => {
        setMetamaskErr('');

        // Check if metamask is installed
        if (!window.ethereum) {
            setMetamaskErr('Metamask is not installed');
            console.log('Metamask is not installed');
            return;
        }

        const senderAccounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        const senderWallet = senderAccounts[0];

        const recieverWallet = profile.wallet;

        if(senderWallet === recieverWallet) {
            setMetamaskErr('You can\'t send to yourself. Please use another wallet.');
            return;
        }

        const ethereum = window.ethereum;

        const provider = new ethers.providers.Web3Provider(ethereum);

        const params = [{
            from: senderWallet,
            to: recieverWallet,
            value: ethers.utils.parseEther((days / 30 * profile.premium).toString(), 'ether').toHexString()
        }]

        try {
            setIsMining(true);
            const transactionHash = await provider.send('eth_sendTransaction', params);

            dispatch(createTransaction({
                reciever: profile.user._id,
                senderWallet,
                recieverWallet,
                premiumDays: days,
                amount: (days / 30 * profile.premium),
                transactionHash,
            }));

            setIsMining(false);
            console.log(transactionHash);
        } catch (err) {
            setIsMining(false);
            console.log(err);
        }
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
            contentLabel={`${profile.username}'s Premium`}
            footerNone
            notCloseOnUpdate
        >
            {profile.isPremium ? (
                <p>
                    You are already a premium user. Your premium will expire on {new Date(profile.exprDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
            ) : (
                <>
                {isMining || isLoading ? (
                    <div className="flex align-center my-1">
                        <div className="btn-icon spinner">
                            {arrowRepeatIcon}
                        </div>
                    </div>
                ) : (
                    isSuccess ? (
                        <>
                            <div className="success-msg">
                                Your transaction is complete.
                            </div>
                            <a href={`https://${process.env.REACT_APP_ETHERSCAN_NET}etherscan.io/tx/${transactions[0].transactionHash}`} className="btn btn-sm mt-1" target="_blank">
                                See Transaction
                            </a>
                        </>
                    ) : (
                    <>
                    <div className="btn btn-sm mb-1"
                        onClick={() => {
                            handleTransaction(30)
                        }}
                    >
                        1 Month {profile.premium} ETH = {(profile.premium * ethPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                    </div>
                    <div className="btn btn-sm mb-1"
                        onClick={() => {
                            handleTransaction(90)
                        }}
                    >
                        3 Month {profile.premium} ETH = {(profile.premium * ethPrice * 3).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                    </div>
                    <div className="btn btn-sm mb-1"
                        onClick={() => {
                            handleTransaction(180)
                        }}
                    >
                        6 Month {profile.premium} ETH = {(profile.premium * ethPrice * 6).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                    </div>
                    <div className="btn btn-sm"
                        onClick={() => {
                            handleTransaction(360)
                        }}
                    >
                        12 Month {profile.premium} ETH = {(profile.premium * ethPrice * 12).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                    </div>
                    <div className="mt-1">
                        <div className="border p-3 text-center bg-secondary">
                            <p className="pb-1">
                                This is a direct payment to the owner of this profile. Fask.me does not collect any fees.
                            </p>
                            <small>
                                Premium lets you ask as many questions as you want and the ability to see premium answers.
                                <br />
                                Don't worry about the cancelation, this is not a subscription, and you won't be automatically renewed.
                            </small>
                        </div>
                    </div>
                    </>
                    )
                )}
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