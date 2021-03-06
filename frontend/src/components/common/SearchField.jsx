import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchUsers } from '../../features/search/searchSlice';
import { arrowRepeatIcon, searchIcon } from '../../constance/icons';
import { Input, Image } from '../';
import './styles/SearchField.css';
import { bgColor } from '../../constance/userMiddleware';


const SearchField = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { search, isLoading } = useSelector(state => state.search);
    const [searchQuery, setSearchQuery] = useState('');
    const searchListRef = useRef(null);
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const handleClickOutside = (event) => {
        if (searchListRef.current && !searchListRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [searchListRef]);

    useEffect(() => {
        let promise = null;
        if (searchQuery.length > 0) {
            const q = `username=${searchQuery}`;
            promise = dispatch(searchUsers(q));
        }

        return () => {
            promise && promise.abort();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
        }
    }, [pathname]);

    return (
        <div className="search">
            <Input
                type="text"
                name="search"
                placeholder="Search"
                label="Search"
                onChange={(e) => {setSearchQuery(e.target.value);}}
                value={searchQuery}
                icon={searchIcon}
                bodyStyle={{
                    margin: '0 1.5rem',
                }}
                inputStyle={{
                    height: '45px',
                    padding: '0px 8px 0px 0px',
                }}
                labelStyle={{
                    top: '0',
                    height: '100%'
                }}
                labelFocusNone={true}
                onClick={() => {setIsOpen(true)}}
            />
            <div className={`search-results${searchQuery && isOpen ? '' : ' d-none'}`}>
                <div className="flex align-between border-bottom p-1">
                    <h3 className="title-3">Search Results</h3>
                    <div 
                        className="btn btn-sm"
                        onClick={() => {setSearchQuery('')}}
                    >
                        Clear
                    </div>
                </div>
                <div 
                    className="search-list"
                    ref={searchListRef}
                >
                    {!isLoading ? (
                        search.map((profile) => (
                        <div className="flex align-between align-center flex-align-center mx-2 mt-1" key={profile._id}>
                            <div className="flex flex-align-center overflow-hidden">
                                <Link to={`/${profile.username}`}>
                                    {profile.avatar ? (
                                        <Image
                                            image={profile.avatar}
                                            alt="Avatar"
                                            classList="profile-image-md"
                                        /> 
                                    ) : (
                                        <div className={`avatar avatar-md ${bgColor(profile.username)}`}>
                                            {profile.username[0].toUpperCase()}
                                        </div>
                                    )}
                                </Link>
                                <div className="min-width-0">
                                    <Link 
                                        to={`/${profile.username}`}
                                        className="title-4 text-hover text-nowrap"
                                    >
                                        {profile.username}
                                    </Link>
                                    {profile.fullName && (
                                        <p className="text-secondary mx-3 text-nowrap">
                                            {profile.fullName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        ))
                ) : (
                    <div className="flex align-center h-100">
                        <div className="btn-icon spinner">
                            {arrowRepeatIcon}
                        </div>
                    </div>
                )}
                {!isLoading && search.length === 0 && (
                    <div className="flex align-center h-100">
                        <p>
                            No results found
                        </p>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default SearchField