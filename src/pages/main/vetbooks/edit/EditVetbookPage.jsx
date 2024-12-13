import classes from './EditVetbookPage.module.css'
import FormHeader from '../create/components/form-header/FormHeader'
import { CustomButton } from '@shared/components'
import { useTranslation } from 'react-i18next'
import Accordion from '../accordion/Accordion'

export const EditVetbookPage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <FormHeader titleKey={t('editVetbook.title')} maxWidth={345} closePath="/profile" classcustomTitleClass={classes.customFormHeader} />
      </div>
      <Accordion />

      <div className={classes.buttonContainer}>
        <CustomButton text={t('customButton.save')} />
      </div>
      <div></div>
    </div>
  )
}
