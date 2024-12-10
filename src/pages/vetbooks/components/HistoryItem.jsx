import React from "react";
import { Link } from "react-router-dom";
import "./HistoryItem.css";

export const HistoryItem = ({ date, description, vetbookId, visitId }) => {
  const truncateDescription = (description) => {
    const maxLength = 50; // Максимальная длина описания
    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  const truncatedDescription = truncateDescription(description);

  return (
  <Link to={`/vetbooks/vetbook/${vetbookId}/${visitId}`}>
    <div className="history-item">
        <div className="date">{date}</div>
        <div className="description">{truncatedDescription}</div>
    </div>
  </Link>
  );
};
