import { useContext  } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import styles from './darkModeToggle.module.scss';

const DarkModeToggle = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Theme must be used within a ThemeProvider');
  }

  return (
    <div className={styles.container} onClick={themeContext.toggle}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔅</div>
      <div className={styles.ball} style={themeContext.mode === 'light' ? {left: '2px'} : {right: '2px'}}></div>
    </div>
  );
};

export default DarkModeToggle;