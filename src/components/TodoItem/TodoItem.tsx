import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  todo: Todo,
  onTodoDelete?: (selectedTodoId: number) => void,
  loadingTodosIds?: number[],
  onUpdateTodo?: (todoId: number, dataToUpdate: Partial<Todo>) => Promise<void>,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onTodoDelete,
  loadingTodosIds,
  onUpdateTodo = () => {},
}) => {
  const [isTodoDeleted, setIsTodoDeleted] = useState(false);

  const handleDeletedTodo = () => {
    setIsTodoDeleted(true);

    if (onTodoDelete) {
      onTodoDelete(todo.id);
    }
  };

  const isLoaderNeeded = todo.id === 0
    || isTodoDeleted
    || loadingTodosIds?.includes(todo.id);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo',
        { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => onUpdateTodo(
            todo.id,
            { completed: !todo.completed },
          )}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={handleDeletedTodo}
      >
        ×
      </button>

      {isLoaderNeeded && <Loader />}
    </div>
  );
};
