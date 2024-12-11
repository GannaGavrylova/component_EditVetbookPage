import { useTranslation } from 'react-i18next'

import { CustomButton, PageHeader } from '@shared/components'
import { useNavigate } from 'react-router-dom'
import classes from './AllVetBooksPage.module.css'
import heartGreen from '@/assets/vetBooks/heartGreen.png'
import heartOrange from '@/assets/vetBooks/heartOrange.png'
import { VetBookItem } from '../components/vetBookItem/VetBookItem'

export const AllVetBooksPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleButtonClick = () => {
    navigate('/main/vetbooks/create-vetbook')
  }

  const mockAnimals = [
    {
      id: 1,
      photo: 'https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg',
      name: 'Барсик',
      kindOfAnimal: 'cat',
      weight: '5 кг',
      gender: 'male',
      doctorNotes: 'Recommended examination in 2 weeks',
    },
    {
      id: 2,
      photo: 'https://cdn.pixabay.com/photo/2018/06/28/14/12/cat-3504008_1280.jpg',
      name: 'Мурка',
      kindOfAnimal: 'cat',
      weight: '4 кг',
      gender: 'female',
      doctorNotes: 'Vaccination required',
    },
    { id: 3, photo: 'https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673_640.jpg', name: 'Мурка', kindOfAnimal: 'кошка', weight: '4 кг', gender: 'Самка', doctorNotes: 'Необходима вакцинация' },
  ]

  const mockAnimalsStray = [
    {
      id: 1,
      photo: 'https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg',
      name: 'Барсик',
      kindOfAnimal: t('cat'),
      weight: '5 кг',
      gender: t('male'),
      doctorNotes: t('Recommended examination in 2 weeks'),
    },
  ]

  const hasNoAnimals = mockAnimals.length === 0 && mockAnimalsStray.length === 0

  return (
    <section className={classes.section}>
      <div className={classes.header}>
        <PageHeader titleKey={t('AllVetBooksPage.title')} pathArrow="/main" pathClose="/main" showClose={false} />
      </div>

      {hasNoAnimals ? (
        <p className={classes.notice}>{t('AllVetBooksPage.notice')}</p>
      ) : (
        <>
          <div className={classes.myAnimals}>
            <h4 className={classes.animalText}>{t('AllVetBooksPage.myAnimals')}</h4>
            <img src={heartGreen} alt="heartGreen" />
          </div>

          <div>
            {mockAnimals.map((animal) => (
              <VetBookItem key={animal.id} animal={animal} />
            ))}
          </div>

          <div className={classes.myAnimals}>
            <h4 className={classes.animalText}>{t('AllVetBooksPage.strayAnimals')}</h4>
            <img src={heartOrange} alt="heartOrange" />
          </div>

          <div>
            {mockAnimalsStray.map((animal) => (
              <VetBookItem key={animal.id} animal={animal} />
            ))}
          </div>
        </>
      )}
      <div className={classes.buttonContainer}>
        <CustomButton text={t('AllVetBooksPage.createNewBook')} onClick={handleButtonClick} />
      </div>
    </section>
  )
}
