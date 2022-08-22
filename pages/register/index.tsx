import { useEffect } from 'react';
import css from './register.module.css';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import { signup } from '../../src/api/auth';
import { useAuthCtx } from '../../src/store/authProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const main = {
  justify: 'center',
  align: 'center',
  minH: '75vh',
  w: '50%',
  m: '0 auto',
};

const inputCont = {
  w: '100%',
  mt: '25px',
};

const formValidation = Yup.object({
  email: Yup.string().trim().email().required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Minimum 8 characters required')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register: NextPage = () => {
  const router = useRouter();
  const { login } = useAuthCtx();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      try {
        const { token, user } = await signup(values.email, values.password);
        if (token && user) {
          action.resetForm();
          login(token, user);
          router.push('/');
          return;
        }
        alert('Registration failed');
      } catch (err) {
        console.log('Registration failed', err);
        alert('Something went wrong');
      }
    },
  });

  const goToLoginPage = () => {
    router.push('/login');
  };

  return (
    <>
      <Flex {...main} direction="column">
        <Heading>Register</Heading>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex {...inputCont} direction="column">
            <div className={css.input}>
              <Input
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Your email"
                isInvalid={!!formik.touched.email && !!formik.errors.email}
                errorBorderColor="crimson"
              />
              <span className={css.error}>
                {formik.touched.email && formik.errors.email}
              </span>
            </div>
            <div className={css.input}>
              <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
                errorBorderColor="crimson"
              />
              <span className={css.error}>
                {formik.touched.password && formik.errors.password}
              </span>
            </div>
            <div className={css.input}>
              <Input
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder="Confirm password"
                isInvalid={
                  !!formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
                errorBorderColor="crimson"
              />
              <span className={css.error}>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </span>
            </div>
          </Flex>
          <Flex alignSelf="flex-start" direction="column">
            <div>
              <Button type="submit" mb="10px">
                Register
              </Button>
            </div>
            <Text mb="10px">
              Login page{' '}
              <span
                onClick={goToLoginPage}
                role="button"
                className={css.button}
              >
                here
              </span>
            </Text>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default Register;
