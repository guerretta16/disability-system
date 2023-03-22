import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../hooks/userStoreHook';
import { LoginForm } from '../../modules/components/LoginForm';
import styles from './loginPage.module.css';

const LoginPage = () => {

    const navigate = useNavigate();
    const { userInfo } = useUserStore();

    useEffect(() => {
        if(userInfo !== null){
          navigate("/home")
        }
      })

  return (
    <div className={styles.container}>
        <LoginForm />
    </div>
  )
}

export default LoginPage
