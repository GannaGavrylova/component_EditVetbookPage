import { Link } from 'react-router-dom'
import classes from './HistoryItem.module.css'

export const HistoryItem = ({ date, description, vetbookId, visitId }) => {
  return (
    <Link to={`/vetbooks/vetbook/${vetbookId}/${visitId}`}>
      <div className={classes.historyItem}>
        <div className={classes.date}>{date}</div>
        <div className={classes.description}>{description}</div>
      </div>
    </Link>
  )
}
