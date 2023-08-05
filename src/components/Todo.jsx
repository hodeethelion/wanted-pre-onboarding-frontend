import React from 'react';

const Todo = ({setting}) => {
  // console.log(setting.todo)
  return (
    <div>
      <li>
        <label>
          <input type="checkbox"/>
          <span>{setting.todo}</span>
        </label>
      </li>
    </div>
  );
};

export default Todo;