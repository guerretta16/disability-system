import React from 'react'
import styles from './loading.module.css';
import Lottie from 'react-lottie';
import loadingAnimation from '../../../assets/lottie/loading.json';

const Loading = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
    <div className={styles.container}>
        <Lottie 
            options={defaultOptions}
            width={80}
            height={80}
        />
    </div>
  )
}

export default Loading;