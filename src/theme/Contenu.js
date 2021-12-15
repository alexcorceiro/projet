import react, {useContext} from 'react' ;
import './Contenu.css'
import { ThemeContext } from '../../Context/ThemeContext';

export default function Contenu() {

    const {theme} = useContext(ThemeContext);

    return (
    <div
    className={theme ? 'contenu light' : 'contenu dark'}
    >
    <h1>Jeu du pendu
    </h1>

    </div>
    )
}