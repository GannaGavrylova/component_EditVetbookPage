import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import classes from './UserProfilePage.module.css'
import avatarPlaceholder from '@/assets/avatarPlaceholder.svg'
import { useQuery } from '@tanstack/react-query'
import { getUser, getUserQuestions } from '@shared/utils/apiService'
import Loader from '@shared/components/loader/Loader'
import { BurgerMenu } from '../../burgerMenu/BurgerMenu'
import { Question } from '@shared/components/question/Question'
import { UnderConstructionIcon } from '@shared/underConstruction/UnderConstruction'
import { MainFooter } from '@/pages/main/components'
import { ErrorMessage } from '@shared/components'

export const UserProfilePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  const handleLogOut = () => {
    localStorage.removeItem('userId')
    navigate('/')
  }

  const {
    data: questions,
    isLoading: isLoadingQuestions,
    error: errorQuestions,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () => getUserQuestions(userId),
  })
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: errorUserData,
  } = useQuery({ queryKey: ['user'], queryFn: () => getUser(userId) })

  if (isLoadingQuestions || isLoadingUserData) {
    return <Loader />
  }
  return (
    <>
      {' '}
      <div className={classes.p_userPage}>
        {errorUserData ? (
          <ErrorMessage message={errorUserData.message} />
        ) : null}
        <BurgerMenu />
        <div className={classes.name_Container}>
          <div className={classes.avatarContainer}>
            <img
              src={userData?.photo ? userData?.photo : avatarPlaceholder}
              alt="Avatar"
              className={classes.avatar}
            />
          </div>
          <div className={classes.userData}>
            <div className={classes.userName}>{userData?.name}</div>
            <div className={classes.userRole}>
              {userData?.volunteer
                ? t('userPage.userRoleVolunteer')
                : t('userPage.userRolePetOwner')}
            </div>
          </div>
        </div>
        <div className={classes.question_box_header}>
          <h6>{t('userPage.myQuestions')}</h6>
          <Link to="/profile/my-questions">
            <p>{t('userPage.allQuestions')}</p>
          </Link>
        </div>
        <div className={classes.question_box_content}>
          {errorQuestions ? (
            <ErrorMessage message={errorQuestions.message} />
          ) : null}
          {questions?.map((q) => (
            <Question {...q} key={q.id} />
          ))}
        </div>
        <div className={classes.question_box_header}>
          <h6>{t('userPage.vetBooks')}</h6>
          <p>{t('userPage.allVetBooks')}</p>
        </div>
        {/** TODO: section in progress remove mock after complete vet book */}
        <div style={{ marginInline: 'auto' }}>
          <p>Under construction...</p>
          <UnderConstructionIcon />
        </div>
        <button
          type="button"
          className={classes.closeBtn}
          onClick={handleLogOut}
        >
          <h5>{t('userPage.logOutButton')}</h5>
        </button>
      </div>
      <MainFooter />
    </>
  )
}
