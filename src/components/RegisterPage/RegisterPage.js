import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import * as md5 from "md5";

const RegisterPage = () => {
  const { register, watch, errors, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const password = useRef();
  password.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // 이메일과 비밀번호로 유저 생성
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await createUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createUser.user.email
        )}?d=identicon`,
      });

      //Firebase 데이터베이스에 저장해주기
      await firebase.database().ref("users").child(createUser.user.uid).set({
        name: createUser.user.displayName,
        image: createUser.user.photoURL,
      });

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <label>Email</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type === "required" && (
          <p>이메일은 반드시 입력해야합니다.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>이메일이 형식에 맞지 않습니다.</p>
        )}
        <label>Name</label>
        <input name="name" ref={register({ required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === "required" && (
          <p>이름은 반드시 입력해야합니다.</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>이름은 10글자를 넘길 수 없습니다.</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>비밀번호는 반드시 입력해야합니다.</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>비밀번호는 6글자 이상이여야 합니다.</p>
        )}
        <label>PasswordConfirm</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>비밀번호 확인은 반드시 입력해야합니다.</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
          )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}

        <input type="submit" value="submit" disabled={loading} />
        <Link to="/login" style={{ color: "gray", textDecoration: "none" }}>
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
