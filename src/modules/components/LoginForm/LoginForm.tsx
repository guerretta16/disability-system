import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginValues } from "../../../interfaces/types";
import useUserStore from "../../../hooks/userStoreHook";
import styles from "./login.module.css";
import { Loading } from "../Loading";
import logo from "../../../assets/img/logo.png";
import { motion } from "framer-motion";

const LoginForm = () => {
  const { login, loading, error } = useUserStore();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<LoginValues>();
  const onSubmit: SubmitHandler<LoginValues> = (data) =>
    login(data.username, data.password);

  useEffect(() => {
    reset({
      username: "",
      password: "",
    });
  }, [isSubmitSuccessful, reset]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: 0.5, delay: 0.5}}
    >
      <div className={styles.info}>
        <img className={styles.img} src={logo} alt="logo" />
        <h1 className={styles.title}>Login to Your Account</h1>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className={styles.error}>Username is required</span>
          )}
        </div>
        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.username && (
            <span className={styles.error}>Password is required</span>
          )}
        </div>
        <div className={styles.group}>
          {error !== "" && <span className={styles.errorLog}>{error}</span>}
        </div>
        <div className={styles.group}>
          <input className={styles.button} type="submit" value="Login" />
        </div>
      </div>
    </motion.form>
  );
};

export default LoginForm;
