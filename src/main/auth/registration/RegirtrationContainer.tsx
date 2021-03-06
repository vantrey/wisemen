import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../bll/store/store'
import {createUser, registerActions} from './registrationReducer'
import {Redirect} from 'react-router-dom'

import Registration from "./Regirtration"
import {registrationFormSchema} from './registrationFormShema'
import {LOGIN_PATH} from '../../ui/components/routes/FormRoutes';
import {useIsSuccessWithNotFirstRendering} from "../../helpers/firstRenderHook";

type RegistrationFormDataType = {
  email: string
  password: string
  passwordConfirmation: string
}

const RegistrationContainer: React.FC = () => {

  const {isSuccess, errorServerMessage} = useSelector((state: AppStateType) => state.registration);

  const dispatch = useDispatch();

  const isSuccessWithNotFirstRender = useIsSuccessWithNotFirstRendering(
      isSuccess,
      registerActions.setIsRegistrationSuccess
  );

  const {register, handleSubmit, errors, reset} = useForm<RegistrationFormDataType>({
    mode: 'onBlur',
    validationSchema: registrationFormSchema
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(createUser(data.email, data.password));
    reset()
  });

  if (isSuccessWithNotFirstRender) return <Redirect to={LOGIN_PATH}/>;

  return (
    <Registration
      errorServerMessage={errorServerMessage}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
    />
  )
};

export default RegistrationContainer
