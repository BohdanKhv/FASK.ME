const bgColor = (username) => {
    if (username.length > 21)
        return 'bg-user-1';
    else if (username.length > 18)
        return 'bg-user-2';
    else if (username.length > 15)
        return 'bg-user-3';
    else if (username.length > 12)
        return 'bg-user-4';
    else if (username.length > 8)
        return 'bg-user-5';
    else if (username.length > 5)
        return 'bg-user-6';
    else
        return 'bg-user-7';
}


export {
    bgColor
} 