import { yupResolver } from '@hookform/resolvers/yup';
import { AppLayout } from "layout/AppLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { registerAction } from "stores/slices/user.slice";
import * as yup from "yup";
import './register.scss';
import bg_register from "../../assets/bg_register.png";

const schema = yup.object().shape({
    firstName: yup.string()
        .required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string()
        .required('Email is required')
        .email("Email is invalid"),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    date: yup.string().required('Date of Birth is required'),
    phone: yup.number()
        .required('Phone number is required')
        .positive().integer(),
    address: yup.string().required('Address is required'),
}).required();

export default function Register() {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.userInfoState);

    const onSubmit = (data) => {
        dispatch(registerAction(data));
    }
    if (userInfo.data) {
        return <Navigate to={'/'} />
    }


    return (<AppLayout>
        <div className="register-container">
        <div className="img">
          <img src={bg_register} alt="Login" width="400" />
        </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <p>Register Account</p>
                <div className="width-input"><input type="text" placeholder="First Name" {...register('firstName')} /></div>
                <div className="errors-message">{errors.firstName?.message}</div>

                <div className="width-input"><input type="text" placeholder="Last Name" {...register('lastName')} /></div>
                <div className="errors-message">{errors.lastName?.message}</div>

                <div className="width-input"><input type="text" placeholder="Email" {...register('email')} /></div>
                <div className="errors-message">{errors.email?.message}</div>

                <div className="width-input"><input type="password" placeholder="Password" {...register('password')} /></div>
                <div className="errors-message">
                    {errors.password?.message}
                </div>
                <div className="width-input"><input type="password" placeholder="Retype password" {...register('retypePassword')} /></div>
                <div className="errors-message">
                    {errors.retypePassword?.message}
                </div>

                <div className="width-input"><input type="number" placeholder="Phone Number" {...register('phone')} /></div>
                <div className="errors-message">{errors.phone?.message}</div>

                <input type="date" {...register('date')} style={{ width: '200px' }} />
                <select {...register("gender")} style={{ width: '185px', height: '40px' }}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
                <div className="errors-message">{errors.date?.message}</div>

                <div className="width-input"><input type="text" placeholder="Address" {...register('address')} /></div>
                <div className="errors-message">{errors.address?.message}</div>
                <input className="btn-submit" type="submit" value="Register" style={{ backgroundColor: '#1890ff' }} />
                <ToastContainer
                    autoClose={1000}
                    style={{ display: "block", position: "fixed", zIndex: "99999" }}
                />
            </form>
        </div>
    </AppLayout>)
}