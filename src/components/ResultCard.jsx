import "./ResultCard.css";

function ResultCard({ name, testResult, confidence }) {
  return (
    <div className={`result-card`}>
      <h3 className="result-card__title">{name}</h3>
      <div className="result-card__info">
        <div className="result-card__item">
          <p className="result-card__left-content">Prediction</p>
          <p className="result-card__right-content">
            {testResult.toUpperCase()}
          </p>
        </div>
        <div className="result-card__item">
          <p className="result-card__left-content">Confidence</p>
          <p className="result-card__right-content">
            {parseFloat(confidence * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
