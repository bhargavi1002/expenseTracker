import React from 'react';
import styles from  './Button.module.css'; 

const Button = ({ children,handleClick,style='primary', shadow = false ,type='button', color}) => {
  const baseStyle = styles.primary;

  const secondaryStyle = styles.secondary; 
  const appliedStyle = type === 'primary' ? baseStyle : secondaryStyle;
  
  const dynamicStyle = color && color.includes('linear-gradient')
  ? { backgroundImage: color,color: '#FFFFFF' }
  : style === 'primary' || style === 'submit'
  ? { backgroundColor: color || '#F4BB4A', color: '#FFFFFF', width: '250px', height: '45px' }
  : { backgroundColor: color || '#E3E3E34A', color: '#000000',width: '150px', height: '45px'}; 


  return (
    <button  type={type} onClick={handleClick} className={`${styles.button} ${appliedStyle} ${shadow ? styles.shadow : ''}`}
    style={dynamicStyle}>
     {children}
    </button>
  );
};



export default Button;

