import { Tooltip, SenderGate } from '../';
import { clickIcon } from "../../constance/icons";

const ClickCount = ({question}) => {

    return (
        question.type === 'faq' ?
            <SenderGate
                sender={question.sender}
            >
                <div className="flex">
                    <Tooltip
                        content={`Clicks`}
                    >
                        <div className="text-hover text-hover-main">
                            {question.readBy ? question.readBy.length : 0}
                        </div>
                        
                    </Tooltip>
                </div>
            </SenderGate>
        :
            null
    )
}

export default ClickCount