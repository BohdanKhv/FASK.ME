import { useLocation } from "react-router-dom"
import { pinIcon } from "../../constance/icons"


const PinnedQuestion = ({ question }) => {
    const pathname = useLocation().pathname.split("/")[2]

    return (
        (!pathname || pathname === "asked") && question.isSenderPinned ? (
        <>
            <div className="btn-icon btn-icon-transparent btn-icon-sm ml-4" title="Pinned">
                {pinIcon}
            </div>
        </>
        ) : pathname === 'answered' && question.isReceiverPinned ? (
        <>
            <div className="btn-icon btn-icon-transparent btn-icon-sm ml-4" title="Pinned">
                {pinIcon}
            </div>
        </>
        ) : (
            null
        )
    )
}

export default PinnedQuestion