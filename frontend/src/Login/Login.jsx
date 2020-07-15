import React from 'react';
import s from './Login.module.scss';
import logo from '../img/logo.png';
import { Field, reduxForm, reset } from 'redux-form';
import { TextArea } from "../Form/Form";
import mail from '../img/mail.png'
import password from '../img/password.png'
import { login } from "../redux/AuthReducer";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }
    if (props.isAuth===true) return <Redirect to = {'/'}/>  
    return (

        <div className={s.Container}>
            <div className={s.logo_container}>
                <img className={s.logo} src={logo} />
            </div>

            <div className={s.content}>
                <div className={s.title_container}>
                    <h1 className={s.title}>
                        Добро пожаловать в <div className={s.bold}>Гринатом!</div>
                    </h1>
                </div>

                <ContactReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    );
}
const ContactForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form className={s.Form} onSubmit={handleSubmit}>
            <div className={s.field}>
                <img className={s.mail_img} src={mail} />
                <Field name={"email"} placeholder={"E-mail"} component={TextArea} />
                <div className={s.underline}></div>
            </div>
            <div className={s.field}>
                <img className={s.password_img} src={password} />
                <Field name={"password"} placeholder={"Пароль"} component={TextArea} />
                <div className={s.underline}></div>
            </div>
            <button className={s.button} > <span>Войти</span> </button>
        </form>
    );
}
const afterSubmit = (result, dispatch) =>
    dispatch(reset('add'));
const ContactReduxForm = reduxForm(
    {
        form: 'add',
        onSubmitSuccess: afterSubmit
    }
)(ContactForm)
const mapStateToProps = (state) => ({
    isAuth: state.AuthReducer.isAuth
})

export default connect(mapStateToProps, { login })(Login);
