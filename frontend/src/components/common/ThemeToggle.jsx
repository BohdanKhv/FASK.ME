import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../features/local/localSlice';
import { Switch } from '../';


const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.local.theme);

    return (
        <div className="p-1 flex align-between">
            <div className="title-2">
                Theme
            </div>
            <Switch
                onChange={() => {
                    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
                }}
                value={theme === 'dark'}
            >
                mode
            </Switch>
        </div>
    )
}

export default ThemeToggle