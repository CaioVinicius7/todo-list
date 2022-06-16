import { PlusCircle } from "phosphor-react";
import { v4 as uuidV4 } from "uuid";

import { Header } from "./components/Header";
import { EmptyList } from "./components/EmptyList";
import { Task } from "./components/Task";

import "./global.css";
import styles from "./App.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface ITodo {
  id: string;
  task: string;
  done: boolean;
}

function App() {
  const [todoList, setTodoList] = useState(Array<ITodo>);
  const [newTask, setNewTask] = useState("");

  const todoCounter = todoList.length;

  const todoDoneCounter = todoList.reduce((totalCompleted, task) => {
    return totalCompleted + Number(task.done)
  }, 0);

  const todoListIsEmpty = todoList.length === 0;

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTodoList([...todoList, {
      id: uuidV4(),
      task: newTask,
      done: false
    }]);

    setNewTask("");
  }

  function deleteTask(id: string) {
    const todoListWithoutDeletedTask = todoList.filter((task) => {
      return task.id !== id;
    });

    setTodoList(todoListWithoutDeletedTask);
  }

  function changeTaskStatus(id: string) {
    const todoListWithChangedTask = todoList.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
        return task;
      }

      return task;
    });

    setTodoList(todoListWithChangedTask);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.createTodoForm}>
          <input 
            type="text"
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit"> 
            Criar
            <PlusCircle className={styles.buttonIcon} size={22} />
          </button>
        </form>

        <main>
          <div className={styles.counter}>
            <div>
              <strong> Tarefas criadas </strong>
              <span> {todoCounter} </span>
            </div>

            <div>
              <strong> Concluídas </strong>
              <span>{todoDoneCounter} de {todoCounter} </span>
            </div>
          </div>

          {todoListIsEmpty ? 
            <EmptyList />  : 
            todoList.map((task) => <Task task={task} key={task.id} onDeleteTask={deleteTask} onChangeStatus={changeTaskStatus} />)
          }
        </main>

      </div>
    </div>
  );
}

export default App;
