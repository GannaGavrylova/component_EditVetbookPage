import React from "react";
import { HistoryItem } from "../../components/HistoryItem";
import { Link } from 'react-router-dom';
import { CustomButton, PageHeader } from '@shared/components';
import "./VisitsHistory.css";

// Mock data for visits
const MOCK_VISITS = [
  { date: "11.10.2024", description: "Профилактическое посещение" },
  { date: "11.09.2024", description: "Плохо ест" },
  { date: "05.07.2024", description: "Вялость и сонливость" },
  { date: "05.05.2024", description: "Кто-то укусил" },
];

export const VisitsHistory = ({ vetbookId }) => {
  return (
    <div className="visits-history">
      <PageHeader
        titleKey="История посещений"
        fontSize="36px"
        pathClose={`/main/vetbooks/${vetbookId}`}
        padding="15px 0 25px 0"
        showArrow={false}
      />

      <div className="visits-list">
        {MOCK_VISITS.map((visit, index) => (
          <HistoryItem
            key={index}
            date={visit.date}
            description={visit.description}
            vetbookId={vetbookId}
            visitId={`visit-${index + 1}`}
          />
        ))}
      </div>

      <div className="add-button-wrapper">
        <Link to={`/main/vetbooks/${vetbookId}/create-visit`}>
          <CustomButton text="Добавить" />
        </Link>
      </div>
    </div>
  );
};
