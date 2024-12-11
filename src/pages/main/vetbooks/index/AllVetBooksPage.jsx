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
        photo: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg", // URL изображения (можно использовать временные заглушки)
        name: "Барсик",
        kindOfAnimal: "кошка",
        weight: "5 кг",
        gender: "Самец",
        doctorNotes: "Рекомендован осмотр через 2 недели",
      },
      {
        id: 2,
        photo: "https://cdn.pixabay.com/photo/2018/06/28/14/12/cat-3504008_1280.jpg",
        name: "Мурка",
        kindOfAnimal: "кошка",
        weight: "4 кг",
        gender: "Самка",
        doctorNotes: "Необходима вакцинация",
      },
      { id: 3,
        photo: "https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673_640.jpg",
        name: "Мурка",
        kindOfAnimal: "кошка",
        weight: "4 кг",
        gender: "Самка",
       doctorNotes: "Необходима вакцинация",
      },
      // {
      //   id: 4,
      //   photo: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg", // URL изображения (можно использовать временные заглушки)
      //   name: "Барсик",
      //   kindOfAnimal: "кошка",
      //   weight: "5 кг",
      //   gender: "Самец",
      //   doctorNotes: "Рекомендован осмотр через 2 недели",
      // },
    ];
    const mockAnimalsStray = [
      {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg", // URL изображения (можно использовать временные заглушки)
        name: "Барсик",
        kindOfAnimal: "кошка",
        weight: "5 кг",
        gender: "Самец",
        doctorNotes: "Рекомендован осмотр через 2 недели",
      },
      // {
      //   id: 2,
      //   photo: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg", // URL изображения (можно использовать временные заглушки)
      //   name: "Барсик",
      //   kindOfAnimal: "Самка",
      //   weight: "5 кг",
      //   gender: "Мужской",
      //   doctorNotes: "Рекомендован осмотр через 2 недели",
      // }
    ]
       
  const hasNoAnimals = mockAnimals.length === 0 && mockAnimalsStray.length === 0;

    return (
      <section className={classes.section}>
         <div className={classes.header}>
      <PageHeader
        titleKey="Ветеринарные книжки"
        pathArrow='/main' 
        pathClose="/main"
      />
    </div>
      

{hasNoAnimals ? (
        <p className={classes.notice}>
          Похоже, что у Вашего любимца
          <br />
          еще нет цифровой ветеринарной книжки :(
        </p>
      ) : (
        <>
          <div className={classes.myAnimals}>
            <h4 className={classes.animalText}>Мои животные</h4>
            <img src={heartGreen} alt="heartGreen" />
          </div>

          
          <div className={classes.animalList}>
            {mockAnimals.map((animal) => (
              <Link 
              key={animal.id} 
              to={`/main/vetbooks/${animal.id}`} 
              className={classes.animalCardLink} 
            >
              <div key={animal.id} className={classes.animalCard}>
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
            <h4 className={classes.animalText}>Бездомные животные</h4>
            <img src={heartOrange} alt="heartOrange" />
          </div>

          <div className={classes.animalListStray}>
            {mockAnimalsStray.map((animal) => (
               <Link 
               key={animal.id} 
               to={`/main/vetbooks/${animal.id}`} 
               className={classes.animalCardLink} 
             >
              <div key={animal.id} className={classes.animalCard}>
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
          <CustomButton text="Создать новую книжку" onClick={handleButtonClick} />
        </div>
      </section>
    );
  };
