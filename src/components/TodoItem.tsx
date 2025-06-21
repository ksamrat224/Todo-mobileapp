import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Div } from 'react-native-magnus';
import Feather from 'react-native-vector-icons/Feather';

interface TodoItemProps {
  item: {
    title: string;
    description?: string;
  };
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem = ({ item, onDelete, onEdit }: TodoItemProps) => {
  return (
    <Div
      bg="white"
      p="md"
      m="sm"
      rounded="xl"
      shadow="sm"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Div flex={1} mr="md">
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
        {item.description ? (
          <Text style={{ color: 'gray', marginTop: 4 }}>{item.description}</Text>
        ) : null}
      </Div>
      <Div row>
        <TouchableOpacity onPress={onEdit} style={{ marginRight: 12 }}>
          <Feather name="edit" size={22} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Feather name="trash-2" size={22} color="#DC143C" />
        </TouchableOpacity>
      </Div>
    </Div>
  );
};

export default TodoItem;
