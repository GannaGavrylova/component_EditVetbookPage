import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomInput, FileUploader } from '@/shared/components'
import s from './accordion.module.css'
import icon from '@/assets/Arrow_vet.svg'

const AccordionSection = ({ title, isOpen, onClick, inputs, inputValues, onInputChange }) => {
  return (
    <div className={`${s.accordionSection} ${isOpen ? s.accordionSectionOpen : s.accordionSectionClosed}`}>
      <h3 className={s.accordionTitle} onClick={onClick}>
        {title}
        <img src={icon} alt="Icon" className={s.icon} />
      </h3>

      {isOpen && (
        <div className={s.accordionContent}>
          {inputs.map((inputData, index) => (
            <div key={index}>
              <label>{inputData.label}</label>
              <CustomInput placeholder={inputData.placeholder} backgroundColor="rgba(42, 157, 143, 0.09)" border="1px solid var(--color-main)" borderRadius="12px" padding="10px" color="var(--color-main)" fontStyle="italic" value={inputValues[index]} onChange={(e) => onInputChange(index, e.target.value)} required={inputData.label.includes('*')} />
            </div>
          ))}

          {/* Вставляем FileUploader для секции "Клинический осмотр" */}
          {title === 'clinicalExamination' && (
            <>
              <label>{'files'}</label>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <FileUploader maxFiles={3} boxSize={50} borderRadius="12px" onUpload={(files) => console.log(files)} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

const Accordion = () => {
  const { t } = useTranslation()
  const [openSections, setOpenSections] = useState(Array(8).fill(false))
  const [inputValues, setInputValues] = useState(
    Array(8)
      .fill([])
      .map(() => Array(4).fill(''))
  )

  const sections = [
    {
      title: t('accordion.title'),
      inputs: [
        {
          label: t('accordion.breedlabel'),
          placeholder: t('accordion.breedplaceholder'),
        },
        {
          label: t('accordion.colorlabel'),
          placeholder: t('accordion.colorplaceholder'),
        },
        { label: t('accordion.agelabel'), placeholder: t('accordion.ageplaceholder') },
        {
          label: t('accordion.features'),
          placeholder: t('accordion.featuresplaceholder'),
        },
      ],
    },
    {
      title: t('accordion.identification'),
      inputs: [
        {
          label: t('accordion.chipNumberLabel'),
          placeholder: t('accordion.chipNumberPlaceholder'),
        },
        {
          label: t('accordion.clinicLabel'),
          placeholder: t('accordion.clinicPlaceholder'),
        },
        {
          label: t('accordion.chipLocationLabel'),
          placeholder: t('accordion.chipLocationPlaceholder'),
        },
        {
          label: t('accordion.chipDateLabel'),
          placeholder: t('accordion.chipDatePlaceholder'),
        },
      ],
    },
    {
      title: t('accordion.rabiesVaccination'),
      inputs: [
        {
          label: t('accordion.vaccineLabel'),
          placeholder: t('accordion.vaccinePlaceholder'),
        },
        {
          label: t('accordion.seriesLabel'),
          placeholder: t('accordion.seriesPlaceholder'),
        },
        {
          label: t('accordion.expiryDateLabel'),
          placeholder: t('accordion.expiryDatePlaceholder'),
        },
        {
          label: t('accordion.clinicVaccineLabel'),
          placeholder: t('accordion.clinicVaccinePlaceholder'),
        },
        {
          label: t('accordion.vaccineDateLabel'),
          placeholder: t('accordion.vaccineDatePlaceholder'),
        },
        {
          label: t('accordion.validityEndDateLabel'),
          placeholder: t('accordion.validityEndDatePlaceholder'),
        },
      ],
    },
    {
      title: t('accordion.otherVaccinations'),
      inputs: [
        {
          label: t('accordion.vaccineLabel'),
          placeholder: t('accordion.vaccinePlaceholder'),
        },
        {
          label: t('accordion.seriesLabel'),
          placeholder: t('accordion.seriesPlaceholder'),
        },
        {
          label: t('accordion.expiryDateLabel'),
          placeholder: t('accordion.expiryDatePlaceholder'),
        },
        {
          label: t('accordion.clinicVaccineLabel'),
          placeholder: t('accordion.clinicVaccinePlaceholder'),
        },
        {
          label: t('accordion.vaccineDateLabel'),
          placeholder: t('accordion.vaccineDatePlaceholder'),
        },
        {
          label: t('accordion.validityEndDateLabel'),
          placeholder: t('accordion.validityEndDatePlaceholder'),
        },
      ],
    },
    {
      title: t('accordion.deworming'),
      inputs: [
        {
          label: t('accordion.dewormingDrugLabel'),
          placeholder: t('accordion.dewormingDrugPlaceholder'),
        },
        {
          label: t('accordion.dewormingDateLabel'),
          placeholder: t('accordion.dewormingDatePlaceholder'),
        },
        {
          label: t('accordion.clinicDewormingLabel'),
          placeholder: t('accordion.clinicDewormingPlaceholder'),
        },
      ],
    },
    {
      title: t('accordion.ectoparasiteTreatment'),
      inputs: [
        {
          label: t('accordion.dewormingDrugLabel'),
          placeholder: t('accordion.dewormingDrugPlaceholder'),
        },
        {
          label: t('accordion.dewormingDateLabel'),
          placeholder: t('accordion.dewormingDatePlaceholder'),
        },
        {
          label: t('accordion.clinicDewormingLabel'),
          placeholder: t('accordion.clinicDewormingPlaceholder'),
        },
      ],
    },
    {
      title: t('accordion.clinicalExamination'),
      inputs: [
        {
          label: t('accordion.examinationDateLabel'),
          placeholder: t('accordion.examinationDatePlaceholder'),
        },
        {
          label: t('accordion.resultLabel'),
          placeholder: t('accordion.resultPlaceholder'),
        },
      ],
    },
    {
      title: t('accordion.registration'),
      inputs: [
        {
          label: t('accordion.registrationClinicLabel'),
          placeholder: t('accordion.registrationClinicPlaceholder'),
        },
        {
          label: t('accordion.registrationNumberLabel'),
          placeholder: t('accordion.registrationNumberPlaceholder'),
        },
      ],
    },
  ]

  const toggleSection = (index) => {
    const updatedSections = [...openSections]
    updatedSections[index] = !updatedSections[index]
    setOpenSections(updatedSections)
  }

  const handleInputChange = (sectionIndex, inputIndex, value) => {
    const updatedValues = [...inputValues]
    updatedValues[sectionIndex][inputIndex] = value
    setInputValues(updatedValues)
  }

  return (
    <div>
      {sections.map((section, index) => (
        <AccordionSection key={index} title={section.title} isOpen={openSections[index]} onClick={() => toggleSection(index)} inputs={section.inputs} inputValues={inputValues[index]} onInputChange={(inputIndex, value) => handleInputChange(index, inputIndex, value)} />
      ))}
    </div>
  )
}

export default Accordion
