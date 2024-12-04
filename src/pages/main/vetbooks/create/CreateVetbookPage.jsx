import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classes from './CreateVetbookPage.module.css'
import close from '@/assets/close.svg'
import { FormHeader } from '@shared/components'
import { useVetbookForm } from './hooks/useVetbookForm'
import { CreateVetbookForm } from './components/CreateVetbookForm'

export const CreateVetbookPage = () => {
  const { t } = useTranslation(null, {
    keyPrefix: 'main/vetbooks/create-vetbook',
  })

  const formProps = useVetbookForm()

  return (
    <div className={classes.createVetbookPage}>
      <div className={classes.createVetbookPage_header}>
        <FormHeader fontSize={36} titleKey={t('createTitle')} />
        <Link to={'/profile'} className={classes.closeBtn}>
          <img src={close} alt="close" />
        </Link>
      </div>
      <p className={classes.createVetbookPage_description}>
        {t('description')}
      </p>
      <CreateVetbookForm {...formProps} />
    </div>
  )
}
