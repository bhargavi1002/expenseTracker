import React from 'react';
import Button from '../button/Button'
import styles from './Card.module.css'

const Card = ({ title,money,buttonText,buttonType, handleClick, success=true }) => {
  let buttonColor;
  let spanColor;
  let fontSize = '16px';
  let fontWeight = '400px';

  if (buttonType === 'success') {
    buttonColor = 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)';
    spanColor = '#9DFF5B'
  } else if (buttonType === 'failure') {
    buttonColor = 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)'; 
    spanColor = '#F4BB4A';
  }
  return (
    <div className={styles.card}>
      <p style={{color:"#FFFFFF"}}>{`${title}: `}
        <span style={{
          color: spanColor, 
          WebkitBackgroundClip: 'text',
          display: 'inline-block',
          padding: '0 5px',

        }}>
          {`₹${money}`}
        </span>
      </p>
      <Button handleClick={handleClick} style={buttonType} color={buttonColor}>
      {buttonText}
      </Button>
    </div>
  );
};

export default Card;
