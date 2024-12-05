import { useTranslation } from 'react-i18next'
import classes from './CreateVetbookPage.module.css'
import { useVetbookForm } from './hooks/useVetbookForm'
import { CreateVetbookForm } from './components/CreateVetbookForm'
import FormHeader from './components/form-header/FormHeader.jsx'

export const CreateVetbookPage = () => {
  const { t } = useTranslation(null, {
    keyPrefix: 'main/vetbooks/create-vetbook',
  })

  const formProps = useVetbookForm()

  return (
    <div className={classes.createVetbookPage}>
      <div className={classes.createVetbookPage_header}>
        <FormHeader titleKey={t('createTitle')} closePath="/profile" />
      </div>
      <p className={classes.createVetbookPage_description}>
        {t('description')}
      </p>
      <CreateVetbookForm {...formProps} />
    </div>
  )
}
