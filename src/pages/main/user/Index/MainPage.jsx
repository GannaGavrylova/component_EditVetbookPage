
import { useEffect } from "react"
import { MainHeader, Opportunity, Statistics, TailBook, MainFooter } from '../../components/'

export const MainPage = () => {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get("user_id")

    if (userId) {
      localStorage.setItem("userId", userId) //TODO: @KonstantinChuper: refactor in hook to handle with tokens
    }
  }, [])


  return (
    <>
      <MainHeader />
      <Opportunity />
      <Statistics />
      <TailBook />
      <MainFooter />
    </>
  )
};

