import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../features/local/localSlice';
import { Switch } from '../';


const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.local.theme);

    return (
        <div className="mt-1 pt-1 flex flex-end">
            <Switch
                onChange={() => {
                    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
                }}
            >
                mode
            </Switch>
        </div>
    )
}

export default ThemeToggle