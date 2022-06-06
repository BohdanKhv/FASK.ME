import { useState } from "react";
import { Modal } from "../";


const HowItWorks = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <Modal
            modalIsOpen={isOpen}
            setModalIsOpen={setIsOpen}
            contentLabel={`How it works`}
            onSubmit={() => { setIsOpen(false) }}
            actionBtnText="Ok"
            >
            <div>
                <div>
                    <p className="pb-1">
                        1) This is a direct transaction between your wallet and the recipient's wallet.
                        Fask.me does not collect any fees.
                    </p>
                    <p className="pb-1">
                        2) Premium lets you ask as many questions as you want and the ability to see premium answers.
                        You won't be automatically renewed.
                    </p>
                    <p className="pb-1 bg-secondary border p-4">
                        NOTE! All transactions are made on Kovan network. Which is a test network.
                    </p>
                </div>
            </div>
        </Modal>
        <div>
            <div className="btn btn-sm mt-1 bg-secondary"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                How it works?
            </div>
        </div>
        </>
    )
}

export default HowItWorks