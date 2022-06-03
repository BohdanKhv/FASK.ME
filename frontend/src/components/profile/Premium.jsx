import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Modal } from '../';
import { starFillIcon, starEmptyIcon } from '../../constance/icons';


const Premium = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { profile } = useSelector(state => state.profile);
    const { isLoading } = useSelector(state => state.transaction);
    const { ethPrice } = useSelector(state => state.local);

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
                <div className="btn btn-sm mb-1">
                    1 Moth {profile.premium} ETH = {(profile.premium * ethPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                <div className="btn btn-sm mb-1 btn-primary">
                    3 Moth {profile.premium} ETH = {(profile.premium * ethPrice * 3).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                <div className="btn btn-sm mb-1">
                    6 Moth {profile.premium} ETH = {(profile.premium * ethPrice * 6).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                <div className="btn btn-sm">
                    12 Moth {profile.premium} ETH = {(profile.premium * ethPrice * 12).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                </div>
                </>
            )}
        </Modal>
        <Tooltip
            classList={'mr-1'}
            content={profile.isPremium ?
                `You are Premium expires on ${new Date(profile.exprDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`
            : 'Become Premium'}
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