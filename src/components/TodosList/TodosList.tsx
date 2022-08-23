import SingleTodo from './SingleTodo/SingleTodo';
import { Heading, Box } from '@chakra-ui/react';
import { TodoObj } from '../../types/types';

interface Props {
  data: TodoObj[];
  changeStatus: (a: TodoObj) => void;
}

function TodosList({ data, changeStatus }: Props) {
  return (
    <Box mt="50px" w="75%">
      <Heading as="h2" size="xl" mb="15px">
        My list
      </Heading>
      {data.map((tobj) => (
        <SingleTodo
          key={tobj.description + tobj.title}
          tobj={tobj}
          changeStatus={changeStatus}
        />
      ))}
    </Box>
  );
}

export default TodosList;
