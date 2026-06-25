import type { Tarefa } from '@/types/tarefa';

export async function buscarTarefas(): Promise<Tarefa[]> {
  return Promise.resolve([
    { id: 1, titulo: 'Estudar Server Components' },
    { id: 2, titulo: 'Criar testes com React Testing Library' },
    { id: 3, titulo: 'Praticar hooks personalizados' },
  ]);
}
