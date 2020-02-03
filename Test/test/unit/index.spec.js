const addTask = (task, listTask) => {
  listTask.push(task);
  return listTask;
};

const removeTask = (task, listTask) => {
  listTask.splice(
    listTask.findIndex(item => item.id === task.id),
    1
  );
  return listTask;
};

const showTask = item => {
  return JSON.stringify(item);
};

const updateTask = (task, taskModified, listTask) => {
  const foundIndex = listTask.findIndex(x => x.id === task.id);
  return (listTask[foundIndex] = taskModified);
};

describe('Todo list', () => {
  it('Should create a task.', () => {
    const taskCreated = {
      id: '3',
      name: 'Test',
      description: 'This is a Test ! ',
    };
    expect(taskCreated.id).toBeDefined();
    expect(taskCreated.name).toBeDefined();
    expect(taskCreated.description).toBeDefined();
  });

  it('Should add a task to the list.', () => {
    const task = { id: '3', name: 'Test', description: 'This is a Test ! ' };
    const listTask = [
      { id: '1', name: 'John', description: 'This is John ! ' },
      { id: '2', name: 'Jane', description: 'This is Jane ! ' },
    ];
    const listTaskAdded = [
      { id: '1', name: 'John', description: 'This is John ! ' },
      { id: '2', name: 'Jane', description: 'This is Jane ! ' },
      { id: '3', name: 'Test', description: 'This is a Test ! ' },
    ];
    expect(addTask(task, listTask)).toEqual(listTaskAdded);
  });

  it('Should show the list.', () => {
    const listTask = [
      { id: '1', name: 'John', description: 'This is John ! ' },
      { id: '2', name: 'Jane', description: 'This is Jane ! ' },
    ];

    listTask.forEach(item => {
      const foundIndex = listTask.findIndex(x => x.id === item.id);
      const taskShowed = listTask[foundIndex];
      expect(showTask(item)).toBe(JSON.stringify(taskShowed));
    });
  });

  it('Should remove a task from the list', () => {
    const task = { id: '3', name: 'Test', description: 'This is a Test ! ' };
    const listTask = [
      { id: '1', name: 'John', description: 'This is John ! ' },
      { id: '2', name: 'Jane', description: 'This is Jane ! ' },
      { id: '3', name: 'Test', description: 'This is a Test ! ' },
    ];
    const listTaskRemoved = [
      { id: '1', name: 'John', description: 'This is John ! ' },
      { id: '2', name: 'Jane', description: 'This is Jane ! ' },
    ];
    expect(removeTask(task, listTask)).toEqual(listTaskRemoved);
  });

  it('Should update a task from the list.', () => {
    const task = { id: '3', name: 'Test', description: 'This is a Test ! ' };
    const listTask = [
      { id: '1', name: 'John', description: 'This is John ! ' },
      { id: '2', name: 'Jane', description: 'This is Jane ! ' },
      { id: '3', name: 'Test', description: 'This is a Test ! ' },
    ];
    const taskModified = {
      id: '3',
      name: 'UnitTest',
      description: 'This is a Test ! ',
    };

    expect(updateTask(task, taskModified, listTask).name).toBe(
      taskModified.name
    );
  });
});
