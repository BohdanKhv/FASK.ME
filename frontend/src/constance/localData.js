import { faqIcon, answeredIcon, askedIcon, inboxIcon, sentIcon } from './icons';

const profileNavigation = [
    {
        name: 'FAQ',
        icon: faqIcon,
        path: '/',
    },
    {
        name: 'Answered',
        icon: answeredIcon,
        path: '/answered',
    },
    {
        name: 'Asked',
        icon: askedIcon,
        path: '/asked',
    }
];


const feedNavigation = [
    {
        name: 'Inbox',
        icon: inboxIcon,
        path: '/',
    },
    {
        name: 'Sent',
        icon: sentIcon,
        path: '/sent',
    }
];


export {
    profileNavigation,
    feedNavigation
};