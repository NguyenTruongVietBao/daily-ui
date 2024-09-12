/*
    "@hookform/devtools": "^4.3.1",
    "@hookform/error-message": "^2.0.1",
    "@hookform/resolvers": "^3.9.0",
    yup

 */
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function SignUpPage() {
    const schema = yup.object().shape({
        fullName: yup.string(),
        email: yup.string().email(),
        age: yup.number().positive().integer().min(18),
        password: yup.string().min(8).max(32),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords does not match"),
        gender: yup.string(),

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input required type="text" placeholder="Full Name..." {...register("fullName")} />
            <p>{errors.fullName?.message}</p>
            <input required type="text" placeholder="Email..." {...register("email")} />
            <p>{errors.email?.message}</p>
            <input required type="number" placeholder="Age..." {...register("age")} />
            <p>{errors.age?.message}</p>
            <input required type="password" placeholder="Password..." {...register("password")} />
            <p>{errors.password?.message}</p>
            <input required type="password" placeholder="Confirm Password..." {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
            <label>male</label>
            <input {...register("gender", {required: true})} type="radio" value="male" required/>
            <label>female</label>
            <input {...register("gender", {required: true})} type="radio" value="female" required/>
            <p>{errors.gender?.message}</p>
            <input type="date" placeholder="dob" {...register("dob", {})} required/>
            <p>{errors.gender?.message}</p>
            <input type="submit"/>
        </form>
    );
};