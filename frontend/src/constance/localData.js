import { faqIcon, inboxIcon, sentIcon, answeredIcon, askedIcon, lockIcon } from "./icons";

const questionsNav = (username) => {
    const nav = [
        {
            name: 'FAQ',
            icon: faqIcon,
            path: `/${username}`,
            isPrivate: false,
        },
        {
            name: 'Answered',
            icon: answeredIcon,
            path: `/${username}/answered`,
            isPrivate: false,
        },
        {
            name: 'Asked',
            icon: askedIcon,
            path: `/${username}/asked`,
            isPrivate: false,
        },
        {
            name: 'Private',
            icon: lockIcon,
            path: `/${username}/private`,
            isPrivate: true,
        }
    ]
    return nav
}

const feedNav = [
    {
        name: 'Feed',
        icon: faqIcon,
        path: '/',
    },
    {
        name: 'Inbox',
        icon: inboxIcon,
        path: '/inbox',
        notify: true,
    },
    {
        name: 'Sent',
        icon: sentIcon,
        path: '/sent',
    },
];


export {
    questionsNav,
    feedNav,
}