import { useSelector, useDispatch } from 'react-redux';
// import { setTheme } from '../../features/local/localSlice';
// import { Switch } from '../';


const NavFooter = () => {
    // const dispatch = useDispatch();
    // const theme = useSelector((state) => state.local.theme);
    const ethPrice = useSelector((state) => state.local.ethPrice);

    return (
        <div>
            <div className="p-3 flex align-between border">
                <div className="title-3">
                    ETH Price:
                </div>
                <div className="title-3">
                    {ethPrice.toFixed(2)} USD
                </div>
            </div>
            {/* <div className="p-1 flex align-between border-top">
                <div className="title-3">
                    Dark Theme
                </div>
                <Switch
                    onChange={() => {
                        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
                    }}
                    value={theme === 'dark'}
                >
                    mode
                </Switch>
            </div> */}
        </div>
    )
}

export default NavFooter