import { useTranslation } from 'react-i18next'

export const useTranslatedOptions = () => {
  const { t } = useTranslation()

  const genderOptions = [
    { value: 'male', label: t('constants.option.male') },
    { value: 'female', label: t('constants.option.female') },
    { value: 'unknown', label: t('constants.option.unknown') },
  ]
  const animalTypeOptions = [
    { value: 'fish', label: t('constants.selectAnimal.fish') },
    { value: 'hedgehog', label: t('constants.selectAnimal.hedgehog') },
    { value: 'snake', label: t('constants.selectAnimal.snake') },
    { value: 'cat', label: t('constants.selectAnimal.cat') },
    { value: 'rabbit', label: t('constants.selectAnimal.rabbit') },
    { value: 'rat', label: t('constants.selectAnimal.rat') },
    { value: 'guineaPig', label: t('constants.selectAnimal.guineaPig') },
    { value: 'mouse', label: t('constants.selectAnimal.mouse') },
    { value: 'bird', label: t('constants.selectAnimal.bird') },
    { value: 'dog', label: t('constants.selectAnimal.dog') },
    { value: 'snail', label: t('constants.selectAnimal.snail') },
    { value: 'hamster', label: t('constants.selectAnimal.hamster') },
    { value: 'turtle', label: t('constants.selectAnimal.turtle') },
    { value: 'chinchilla', label: t('constants.selectAnimal.chinchilla') },
    { value: 'other', label: t('constants.selectAnimal.other') },
  ]

  return { genderOptions, animalTypeOptions }
}
