import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { CheckIcon, ViewIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useDataCtx } from '../../../store/dataProvider';
import type { TodoObj } from '../../../types/types';

const main = {
  w: '100%',
  mt: '5px',
  border: '1px solid lightgray',
  borderRadius: '5px',
  p: '5px 10px',
};

interface Props {
  tobj: TodoObj;
  changeStatus: (a: TodoObj) => void;
}

function SingleTodo({ tobj, changeStatus }: Props) {
  const router = useRouter();
  const { data } = useDataCtx();
  return (
    <Flex {...main} direction="column" position="relative">
      <Box mb="5px">
        <Heading as="h3" size="md">
          {tobj.title}
        </Heading>
      </Box>
      <Box mb="2px">
        <Text>{tobj.description}</Text>
      </Box>
      <Box>
        <Text color={tobj.status === 'incomplete' ? 'crimson' : 'green'}>
          {tobj.status}
        </Text>
      </Box>
      <Box
        role="button"
        onClick={() => changeStatus(tobj)}
        color={tobj.status === 'incomplete' ? 'crimson' : 'green'}
        position="absolute"
        top="2"
        right="5"
      >
        <CheckIcon />
      </Box>
      <Box
        onClick={() => {
          router.push({
            pathname: '/todo',
            query: { idx: data.indexOf(tobj) },
          });
        }}
        role="button"
        position="absolute"
        bottom="2"
        right="5"
      >
        <ViewIcon />
      </Box>
    </Flex>
  );
}

export default SingleTodo;
