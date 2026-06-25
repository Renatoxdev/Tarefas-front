'use client';

import { FormEvent, useState } from 'react';

type NovaTarefaProps = {
  onAdicionar?: (titulo: string) => void;
};

export default function NovaTarefa({ onAdicionar }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [erro, setErro] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const tituloFormatado = titulo.trim();

    if (!tituloFormatado) {
      setErro('Informe uma tarefa antes de adicionar.');
      return;
    }

    onAdicionar?.(tituloFormatado);
    setTitulo('');
    setErro('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} aria-label="nova tarefa">
      <label htmlFor="nova-tarefa">Nova tarefa</label>
      <input
        id="nova-tarefa"
        name="nova-tarefa"
        type="text"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? 'nova-tarefa-erro' : undefined}
      />

      {erro ? (
        <p className="task-error" id="nova-tarefa-erro" role="alert">
          {erro}
        </p>
      ) : null}

      <button type="submit">Adicionar tarefa</button>
    </form>
  );
}
