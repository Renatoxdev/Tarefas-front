'use client';

import { useState } from 'react';
import NovaTarefa from '@/components/NovaTarefa';
import useContadorDeTarefas from '@/hooks/useContadorDeTarefas';
import type { Tarefa } from '@/types/tarefa';

type ListaDeTarefasProps = {
  tarefasIniciais: Tarefa[];
};

export default function ListaDeTarefas({ tarefasIniciais }: ListaDeTarefasProps) {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const totalDeTarefas = useContadorDeTarefas(tarefas);

  function adicionarTarefa(titulo: string) {
    setTarefas((tarefasAtuais) => [
      ...tarefasAtuais,
      {
        id: Date.now(),
        titulo,
      },
    ]);
  }

  function removerTarefa(id: number) {
    setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa.id !== id));
  }

  return (
    <>
      <p className="task-count" aria-label="total de tarefas">
        Total de tarefas: {totalDeTarefas}
      </p>

      <div className="task-panel">
        <NovaTarefa onAdicionar={adicionarTarefa} />

        <section className="task-section" aria-labelledby="tarefas">
          <h2 id="tarefas">Tarefas</h2>

          <ul className="task-list">
            {tarefas.map((tarefa) => (
              <li key={tarefa.id}>
                <span>{tarefa.titulo}</span>
                <button
                  type="button"
                  className="task-remove"
                  onClick={() => removerTarefa(tarefa.id)}
                  aria-label={`Remover tarefa ${tarefa.titulo}`}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
