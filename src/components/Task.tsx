import { Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface ITaskProps {
  task: {
    id: string;
    task: string;
    done: boolean;
  };
  onDeleteTask: (id: string) => void;
  onChangeStatus: (id: string) => void;
}

export function Task({ task, onDeleteTask, onChangeStatus }: ITaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleChangeStatus() {
    onChangeStatus(task.id);
  }

  return (
    <div className={styles.task}>
      <div className={styles.taskItems}>
        <input type="checkbox" onClick={handleChangeStatus} />
        <div className={styles.taskContent}>
          <span> {task.task} </span>
        </div>
      </div>
      <div className={styles.delete}>
        <button onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}
