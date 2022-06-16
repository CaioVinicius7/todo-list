import styles from "./EmptyList.module.css";
import list from "../assets/list.svg";


export function EmptyList() {
  return (
    <div className={styles.emptyList}>
      <img src={list} alt="ícone" />
      <strong> Você ainda não tem tarefas cadastradas </strong>
      <p> Crie tarefas e organize seus itens a fazer </p>
  </div>
  );
}