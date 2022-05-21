import { Tooltip, SenderGate } from '../';
import { clickIcon } from "../../constance/icons";

const ClickCount = ({question}) => {

    return (
        question.type === 'faq' ?
            <SenderGate
                sender={question.sender}
            >
                <Tooltip
                    content={`Clicks`}
                >
                    <div className="btn btn-xs">
                        {question.readBy ? question.readBy.length : 0}
                    </div>
                </Tooltip>
            </SenderGate>
        :
            null
    )
}

export default ClickCount