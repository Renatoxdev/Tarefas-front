import { useMemo } from 'react';

export default function useContadorDeTarefas<T>(tarefas: T[]) {
  return useMemo(() => tarefas.length, [tarefas]);
}