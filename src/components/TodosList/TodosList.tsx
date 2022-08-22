import SingleTodo from './SingleTodo/SingleTodo';
import { Heading, Box } from '@chakra-ui/react';

function TodosList({ data, changeStatus }: any) {
  return (
    <Box mt="50px" w="75%">
      <Heading as="h2" size="xl" mb="15px">
        My list
      </Heading>
      {data.map((tobj: any) => (
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
