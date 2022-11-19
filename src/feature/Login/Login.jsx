import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from 'antd';
import { AppLayout } from "layout/AppLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import bg_login from "../../assets/bg_login.png";

import { loginAction } from "stores/slices/user.slice";
import * as yup from "yup";
import './login.scss';

const schema = yup.object().shape({
    email: yup.string()
        .required('Please enter a valid email address'),
    password: yup.string()
        .required('Please enter a valid password'),
}).required();

export default function Login() {
    const userInfo = useSelector(state => state.users.userInfoState);
    // console.log("userInfo:", userInfo);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    if (userInfo.data) {
        return <Navigate to={'/'} />
    }

    const onSubmit = (data) => {        
        dispatch(loginAction(data));
    };
    return (
        <AppLayout>
            <div className="login-page">
                <div className="img">
          <img src={bg_login} alt="Login" width="400" />
        </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                <p className="title">Log in Account</p>

                    <div className="width-input">
                        <UserOutlined className="site-form-item-icon" />
                        <input
                            type="text"
                            {...register("email")}
                            placeholder="Username"
                        />
                    </div>
                    <div className="errors-message">
                        {errors.email?.message}
                    </div>

                    <div className="width-input">
                        <LockOutlined className="site-form-item-icon" />
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                        />
                    </div>
                    <div className="errors-message">
                        {errors.password?.message}
                    </div>
                    <div className="login-form-box-forgot">
                        <Checkbox>Remember me</Checkbox>
                        <span className="login-form-forgot">
                            Forgot password
                        </span>
                    </div>
                    <div className="btn-submit"><input type={"submit"} value="Log in" /><ToastContainer autoClose={1000} /></div>
                    Or <Link to="/register">Register now!</Link>
                </form>
            </div>
        </AppLayout >
    )
}