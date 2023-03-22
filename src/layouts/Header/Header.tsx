import useUserStore from '../../hooks/userStoreHook';
import styles from './header.module.css';

const Header = () => {
  const {userInfo, logout} = useUserStore();
  return (
    <header className={styles.header}>
      <div className={styles.logout}>
        <span className={styles.userName}>Hi! {userInfo?.employeeName}</span>
        <span className={styles.button} onClick={logout}>Logout {"->"}</span>
      </div>
    </header>
  )
}

export default Header;