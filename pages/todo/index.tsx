import type { NextPage } from 'next';
import SingleTodo from '../../src/components/TodosList/SingleTodo/SingleTodo';
import { useRouter } from 'next/router';
import { useDataCtx } from '../../src/store/dataProvider';
import { useAuthCtx } from '../../src/store/authProvider';
import { Button, Flex } from '@chakra-ui/react';

const Todo: NextPage = () => {
  const router = useRouter();
  const { data, dispatch } = useDataCtx();
  const { user } = useAuthCtx();
  const todoidx = Number(router.query.idx);

  const changeStatus = (todo: any) => {
    dispatch({ type: 'CHANGE_STATUS', payload: { data: todo, uid: user.uid } });
  };

  const goToHomePage = () => {
    router.push('/');
  };

  return (
    <Flex direction="column" w="75%" m="0 auto">
      {data[todoidx] && (
        <>
          <SingleTodo tobj={data[todoidx]} changeStatus={changeStatus} />
          <Button mt="25px" onClick={goToHomePage}>
            Go back
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Todo;
