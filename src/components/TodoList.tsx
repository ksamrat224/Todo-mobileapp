import React from 'react';
import { FlatList, Text } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onDelete,
  onEdit,
}: {
  todos: any[];
  onDelete: (id: number) => void;
  onEdit: (item: any) => void;
}) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          onDelete={() => onDelete(item.id)}
          onEdit={() => onEdit(item)}
        />
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No todos found.
        </Text>
      }
    />
  );
};

export default TodoList;