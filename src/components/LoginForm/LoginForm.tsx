import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "@/apollo/user";
import "./styles.css";

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginData {
  login: {
    token: string;
  };
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation<LoginData>(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      navigate("/dashboard");
    },
  });

  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = (formValues: LoginFormValues) => {
    login({
      variables: {
        username: formValues.username,
        password: formValues.password,
      },
    });
  };

  return (
    <div className="login-form__wrapper">
      <h1>Вход</h1>
      <p>Уникальная технология доступна для вашего бизнеса уже сейчас</p>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {error && <p className="login-form__error">{error.message}</p>}
        <input
          {...register("username", { required: true })}
          className="login-form__input"
          placeholder="Логин"
        />
        <input
          {...register("password", { required: true })}
          className="login-form__input"
          placeholder="Пароль"
          type="password"
        />
        <button disabled={loading} className="login-form__btn">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
