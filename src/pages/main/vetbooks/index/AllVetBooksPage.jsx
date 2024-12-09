import { useTranslation } from 'react-i18next'
import React, { useState } from "react"
import {CustomButton, PageHeader } from "@shared/components"
import { useNavigate, Link } from 'react-router-dom'
import classes from "./AllVetBooksPage.module.css"
import heartGreen from "../../../../assets/vetBooks/heartGreen.png"
import heartOrange from "../../../../assets/vetBooks/heartOrange.png"

export const AllVetBooksPage = () => {
   const navigate = useNavigate()
   const { t } = useTranslation()

   const [currentPage, setCurrentPage] = useState(1)
   const [currentPageStray, setCurrentPageStray] = useState(1)

   const handleButtonClick = () => {
      navigate("/main/vetbooks/create-vetbook")
   }

   const mockAnimals = [
      {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg", 
        name: "Барсик",
        kindOfAnimal: t("cat"),
        weight: "5 кг",
        gender: t("male"),
        doctorNotes: t("Recommended examination in 2 weeks"),
      },
      {
        id: 2,
        photo: "https://cdn.pixabay.com/photo/2018/06/28/14/12/cat-3504008_1280.jpg",
        name: "Мурка",
        kindOfAnimal: t("cat"),
        weight: "4 кг",
        gender: t("female"),
        doctorNotes: t("Vaccination required"),
      },
      { id: 3,
        photo: "https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673_640.jpg",
        name: "Мурка",
        kindOfAnimal: ("кошка"),
        weight: "4 кг",
        gender: t("Самка"),
       doctorNotes: "Необходима вакцинация",
      },
   ];

   const mockAnimalsStray = [
      {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg",
        name: "Барсик",
        kindOfAnimal: t("cat"),
        weight: "5 кг",
        gender: t("male"),
        doctorNotes: t("Recommended examination in 2 weeks"),
      }
   ]
       
   const hasNoAnimals = mockAnimals.length === 0 && mockAnimalsStray.length === 0;

   return (
      <section className={classes.section}>
         <div className={classes.header}>
            <PageHeader
               titleKey={t("Veterinary Books")}
               pathArrow='/main' 
               pathClose="/main"
            />
         </div>

         {hasNoAnimals ? (
            <p className={classes.notice}>
              {t("It seems that your pet doesn't have a digital veterinary book yet :(")}
            </p>
         ) : (
         <>
            <div className={classes.myAnimals}>
               <h4 className={classes.animalText}>{t("My Animals")}</h4>
               <img src={heartGreen} alt="heartGreen" />
            </div>

            <div className={classes.animalList}>
               {mockAnimals.map((animal) => (
                  <Link 
                     key={animal.id} 
                     to={`/main/vetbooks/${animal.id}`} 
                     className={classes.animalCardLink} 
                  >
                     <div className={classes.animalCard}>
                        <div>
                           <img src={animal.photo} alt={animal.name} className={classes.photo} />
                        </div>
                        <div className={classes.informationBlock}>
                           <div>
                              <div className={classes.nameBlock}>
                                 <h2>{animal.name}</h2>
                              </div>
                              <div className={classes.personalData}>
                                 <p>{animal.kindOfAnimal}</p>
                                 <p>{animal.weight}</p>
                                 <p>{animal.gender}</p>
                              </div>
                           </div>
                           <div className={classes.orangeBox}>
                              <p>{animal.doctorNotes}</p>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>

            <div className={classes.myAnimals}>
               <h4 className={classes.animalText}>{t("Stray Animals")}</h4>
               <img src={heartOrange} alt="heartOrange" />
            </div>

            <div className={classes.animalListStray}>
               {mockAnimalsStray.map((animal) => (
                  <Link 
                     key={animal.id} 
                     to={`/main/vetbooks/${animal.id}`} 
                     className={classes.animalCardLink} 
                  >
                     <div className={classes.animalCard}>
                        <div>
                           <img src={animal.photo} alt={animal.name} className={classes.photo} />
                        </div>
                        <div className={classes.informationBlock}>
                           <div>
                              <div className={classes.nameBlock}>
                                 <h2>{animal.name}</h2>
                              </div>
                              <div className={classes.personalData}>
                                 <p>{animal.kindOfAnimal}</p>
                                 <p>{animal.weight}</p>
                                 <p>{animal.gender}</p>
                              </div>
                           </div>
                           <div className={classes.orangeBox}>
                              <p>{animal.doctorNotes}</p>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </>
         )}

         <div className={classes.buttonContainer}>
            <CustomButton text={t("Create a new book")} onClick={handleButtonClick} />
         </div>
      </section>
   );
};
