import './App.css';
import Game from './components/Game';
import BtnToggle from './theme/btnToggle';
import ThemeContextProvider from './theme/ThemeContext';
import Contenu from './theme/Contenu';

function App() {
  return (
    <div className="App">
      <h1>el pendu</h1>
      <h3>joue si tu l'oses</h3>
      <ThemeContextProvider>
      <BtnToggle/>
      <Contenu/>
      <Game />
     </ThemeContextProvider> 
    </div>
  );
}

export default App;
