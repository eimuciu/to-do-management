import { useEffect } from 'react';
import css from './login.module.css';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, Heading, Input, Button, Text, Box } from '@chakra-ui/react';
import { signin, googlesignin } from '../../src/api/auth';
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
});

const Login: NextPage = () => {
  const router = useRouter();
  const { login, isUserLoggedIn } = useAuthCtx();

  useEffect(() => {
    if (isUserLoggedIn) router.push('/');
  }, [isUserLoggedIn, router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      try {
        const { token, user } = await signin(values.email, values.password);
        if (token && user) {
          action.resetForm();
          login(token, user);
          router.push('/');
          return;
        }
        alert('Login failed');
      } catch (err) {
        console.log('Login failed', err);
        alert('Something went wrong');
      }
    },
  });

  const goToRegisterPage = () => {
    router.push('/register');
  };

  const loginWithGoogle = async () => {
    const { token, user } = await googlesignin();
    if (token && user) {
      login(token, user);
      router.push('/');
    }
  };

  return (
    <>
      {!isUserLoggedIn && (
        <Flex {...main} direction="column">
          <Heading>Login</Heading>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <Flex {...inputCont} direction="column">
              <Box className={css.input}>
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
              </Box>
              <Box className={css.input}>
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
              </Box>
            </Flex>
            <Flex alignSelf="flex-start" direction="column">
              <Box>
                <Button type="submit" mb="10px">
                  Login
                </Button>
              </Box>
              <Text mb="15px">
                Login with Google account{' '}
                <span
                  onClick={loginWithGoogle}
                  role="button"
                  className={css.button}
                >
                  here
                </span>
              </Text>
              <Text mb="10px">
                Don&apos;t have an account? Register{' '}
                <span
                  onClick={goToRegisterPage}
                  role="button"
                  className={css.button}
                >
                  here
                </span>
              </Text>
            </Flex>
          </form>
        </Flex>
      )}
    </>
  );
};

export default Login;
