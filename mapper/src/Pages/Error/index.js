import { Link } from 'react-router-dom';
import './styles.css';

export default function Error () {

    return (
        <div className="root"
            <h1>Erro 404, Página não encontrada!</h1>
            <Link to="/"><button variant="outlined" color="primary" className="buttonErro">Home</button></Link>
        </div>
    );
}
