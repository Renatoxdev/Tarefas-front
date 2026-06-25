import ListaDeTarefas from '@/components/ListaDeTarefas';
import { buscarTarefas } from '@/data/tarefas';

export default async function Home() {
  const tarefas = await buscarTarefas();

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Lista de tarefas</h1>
      </header>

      <ListaDeTarefas tarefasIniciais={tarefas} />
    </main>
  );
}
