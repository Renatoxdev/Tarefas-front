import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import Home from '@/app/page';

describe('Home', () => {
  it('renderiza os elementos principais e a lista inicial de tarefas', async () => {
    const Page = await Home();

    render(Page);

    expect(screen.getByRole('heading', { level: 1, name: /lista de tarefas/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/total de tarefas/i)).toHaveTextContent('Total de tarefas: 3');
    expect(screen.getByRole('form', { name: /nova tarefa/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /tarefas/i })).toBeInTheDocument();
    expect(screen.getByText('Estudar Server Components')).toBeInTheDocument();
    expect(screen.getByText('Criar testes com React Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Praticar hooks personalizados')).toBeInTheDocument();
  });

  it('adiciona uma nova tarefa pela pagina principal', async () => {
    const user = userEvent.setup();
    const Page = await Home();

    render(Page);

    await act(async () => {
      await user.type(screen.getByRole('textbox', { name: /nova tarefa/i }), 'Publicar no GitHub');
      await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }));
    });

    expect(screen.getByText('Publicar no GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText(/total de tarefas/i)).toHaveTextContent('Total de tarefas: 4');
  });

  it('remove uma tarefa pela pagina principal', async () => {
    const user = userEvent.setup();
    const Page = await Home();

    render(Page);

    await act(async () => {
      await user.click(
        screen.getByRole('button', {
          name: /remover tarefa estudar server components/i,
        }),
      );
    });

    expect(screen.queryByText('Estudar Server Components')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/total de tarefas/i)).toHaveTextContent('Total de tarefas: 2');
  });
});
