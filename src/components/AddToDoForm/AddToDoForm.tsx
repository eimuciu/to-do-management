import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setData } from '../../api/db';
import { Input, Textarea, Box, Button } from '@chakra-ui/react';
import css from './AddToDoForm.module.css';
import { useDataCtx } from '../../store/dataProvider';
import type { TodoObj, UserObj } from '../../types/types';

const formValidation = Yup.object({
  title: Yup.string().trim().required('Required'),
  description: Yup.string().trim().required('Required'),
});

interface Props {
  user: UserObj;
}

function AddToDoForm({ user }: Props) {
  const { dispatch } = useDataCtx();
  const formik = useFormik({
    initialValues: { title: '', description: '' },
    validationSchema: formValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      await setData(
        user.uid,
        {
          ...values,
          status: 'incomplete',
        },
        (newdata: { data: TodoObj }) => {
          dispatch({ type: 'SET_TODOS', payload: newdata.data });
          action.resetForm();
        },
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <Input
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        placeholder="Title"
        isInvalid={!!formik.touched.title && !!formik.errors.title}
        errorBorderColor="crimson"
      />
      <Textarea
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        placeholder="Description"
        isInvalid={!!formik.touched.description && !!formik.errors.description}
        errorBorderColor="crimson"
      />
      <Box>
        <Button type="submit">Add</Button>
      </Box>
    </form>
  );
}

export default AddToDoForm;
