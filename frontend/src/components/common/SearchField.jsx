import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchProfiles } from '../../features/profile/profileSlice';
import { arrowRepeatIcon, searchIcon } from '../../constance/icons';
import { Input, Image } from '../';
import './styles/SearchField.css';


const SearchField = () => {
    const dispatch = useDispatch();
    const { search, isSearchLoading } = useSelector(state => state.profile);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let promise = null;
        if (searchQuery.length > 0) {
            const q = `username=${searchQuery}`;
            promise = dispatch(searchProfiles(q));
        }

        return () => {
            promise && promise.abort();
        }
    }, [searchQuery]);

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
            />
            <div className={`search-results${searchQuery ? '' : ' d-none'}`}>
                <div className="flex align-between border-bottom p-1">
                    <h3 className="title-3">Search Results</h3>
                    <div 
                        className="btn btn-sm"
                        onClick={() => {setSearchQuery('')}}
                    >
                        Clear
                    </div>
                </div>
                <div className="search-list">
                    {!isSearchLoading ? (
                        search.map((profile) => (
                        <div className="flex align-between align-center flex-align-center mx-2 mt-1" key={profile._id}>
                            <div className="flex flex-align-center">
                                <Link to={`/${profile.username}`}>
                                    {profile.avatar ? (
                                        <Image
                                            image={profile.avatar}
                                            alt="Avatar"
                                            classList="profile-image-md"
                                        /> 
                                    ) : (
                                        <div className="profile-image-placeholder profile-image-placeholder-md">
                                            {profile.username[0].toUpperCase()}
                                        </div>
                                    )}
                                </Link>
                                <div>
                                    <Link 
                                        to={`/${profile.username}`}
                                        className="title-4 text-hover"
                                    >
                                        @{profile.username}
                                    </Link>
                                    {profile.fullName && (
                                        <p className="text-secondary mx-3">
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
                {!isSearchLoading && search.length === 0 && (
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