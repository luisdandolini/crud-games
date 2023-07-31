import PropTypes from 'prop-types';
import './styles.css';

export default function Cards(props) {
  return(
    <div className="card--container">
      <h1 className="card--title">{props.name}</h1>
      <p className="card--category">{props.category}</p>
      <p className="card--cost">R$ {props.cost}</p>
      <button onClick={props.onEdit}>Editar</button>
      <button onClick={props.onDelete}>Deletar</button>
    </div>
  )
}

Cards.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired, 
  category: PropTypes.string.isRequired,
  onEdit: PropTypes.any.isRequired,
  onDelete: PropTypes.any.isRequired,
}