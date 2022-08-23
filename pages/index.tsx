import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuthCtx } from '../src/store/authProvider';
import { useDataCtx } from '../src/store/dataProvider';
import { Flex } from '@chakra-ui/react';
import AddToDoForm from '../src/components/AddToDoForm/AddToDoForm';
import Header from '../src/components/Header/Header';
import TodosList from '../src/components/TodosList/TodosList';
import type { TodoObj } from '../src/types/types';

const mainContainer = {
  w: '75%',
  m: '0 auto',
  mt: '50px',
  mb: '50px',
  justify: 'center',
  align: 'center',
};

const Home: NextPage = () => {
  const { isUserLoggedIn, logout, user } = useAuthCtx();
  const { data, dispatch } = useDataCtx();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push('/login');
      return;
    }
  }, [isUserLoggedIn, router]);

  const changeStatus = (todo: TodoObj) => {
    dispatch({ type: 'CHANGE_STATUS', payload: { data: todo, uid: user.uid } });
  };

  return (
    <>
      {isUserLoggedIn && (
        <Flex {...mainContainer} position={'relative'} direction="column">
          <Header logout={logout} />
          <AddToDoForm user={user} />
          <TodosList data={data} changeStatus={changeStatus} />
        </Flex>
      )}
    </>
  );
};

export default Home;
