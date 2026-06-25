import { renderHook } from '@testing-library/react';
import useContadorDeTarefas from '@/hooks/useContadorDeTarefas';

describe('useContadorDeTarefas', () => {
  it('retorna zero para uma lista vazia', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));

    expect(result.current).toBe(0);
  });

  it('retorna o total correto para uma lista populada', () => {
    const tarefas = [
      { id: 1, titulo: 'Estudar Next.js' },
      { id: 2, titulo: 'Escrever testes' },
      { id: 3, titulo: 'Refatorar componentes' },
    ];

    const { result } = renderHook(() => useContadorDeTarefas(tarefas));

    expect(result.current).toBe(3);
  });
});
