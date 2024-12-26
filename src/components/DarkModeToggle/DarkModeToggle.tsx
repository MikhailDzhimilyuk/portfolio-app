import { useContext  } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import styles from './darkModeToggle.module.scss';

const DarkModeToggle = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Theme must be used within a ThemeProvider');
  }
  
  const data : {opacity: [string, string], leftOrRight: CanvasTextAlign} = (themeContext.mode === 'light') ? 
    {opacity: ['0', '1'],  leftOrRight: 'left'} : 
    {opacity: ['1', '0'], leftOrRight: 'right'};

  return (
    <div className={styles.container} onClick={themeContext.toggle}>
      <div className={styles.icon} style={{opacity: data.opacity[0]}}>🌞</div>
      <div className={styles.icon} style={{opacity: data.opacity[1]}}>🌙</div>
      <div className={styles.ball} style={{[data.leftOrRight]: '2px'}}></div>
    </div>
  );
};

export default DarkModeToggle;