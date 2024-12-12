import { Link } from 'react-router-dom'
import classes from './VetBookItem.module.css'

export const VetBookItem = ({ animal }) => {
  return (
    <Link to={`/main/vetbooks/${animal.id}`} className={classes.animalCardLink}>
      <div className={classes.animalCard}>
        <div>
          <img src={animal.photo} alt={animal.name} className={classes.photo} />
        </div>
        <div className={classes.informationBlock}>
          <div>
            <div className={classes.nameBlock}>
              <h2>{animal.name}</h2>
            </div>
            <div className={classes.personalData}>
              <p>{animal.kindOfAnimal}</p>
              <p>{animal.weight}</p>
              <p>{animal.gender}</p>
            </div>
          </div>
          <div className={classes.orangeBox}>
            <p>{animal.doctorNotes}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
