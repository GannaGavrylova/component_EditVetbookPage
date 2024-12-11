import { useParams } from 'react-router-dom'
import { HistoryItem } from '../../components/HistoryItem'
import { CustomButton, PageHeader } from '@shared/components'
import classes from './VisitsHistory.module.css'

// Mock data for visits
const MOCK_VISITS = [
  { date: '11.10.2024', description: 'Профилактическое посещение. Вялость и сонливость.Плохо ест' },
  { date: '11.09.2024', description: 'Плохо ест' },
  { date: '05.07.2024', description: 'Вялость и сонливость' },
  { date: '05.05.2024', description: 'Кто-то укусил' },
]

export const VisitsHistory = () => {
  const { vetbookId } = useParams()
  console.log({ vetbookId })

  return (
    <div className={classes.visitsHistory}>
      <PageHeader titleKey="История посещений" fontSize="36px" pathClose={`/main/vetbooks/${vetbookId}`} padding="15px 0 25px 0" showArrow={false} />

      <div className={classes.visitsList}>
        {MOCK_VISITS.map((visit, index) => (
          <HistoryItem key={index} date={visit.date} description={visit.description} vetbookId={vetbookId} visitId={`visit-${index + 1}`} />
        ))}
      </div>

      <div className={classes.addButtonWrapper}>
        <CustomButton text="Добавить" to={`/main/vetbooks/${vetbookId}/create-visit`} />
        {/* TODO: add  text with translation */}
      </div>
    </div>
  )
}
