import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import NovaTarefa from '@/components/NovaTarefa';

describe('<NovaTarefa />', () => {
  it('renderiza o input e o botao de submissao', () => {
    render(<NovaTarefa />);

    expect(screen.getByRole('textbox', { name: /nova tarefa/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument();
  });

  it('permite digitar e chama a funcao de submissao com o texto informado', async () => {
    const user = userEvent.setup();
    const onAdicionar = jest.fn();

    render(<NovaTarefa onAdicionar={onAdicionar} />);

    const input = screen.getByRole('textbox', { name: /nova tarefa/i });

    await act(async () => {
      await user.type(input, 'Comprar leite');
      await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }));
    });

    expect(onAdicionar).toHaveBeenCalledTimes(1);
    expect(onAdicionar).toHaveBeenCalledWith('Comprar leite');
    expect(input).toHaveValue('');
  });

  it('impede o envio quando o input esta vazio', async () => {
    const user = userEvent.setup();
    const onAdicionar = jest.fn();

    render(<NovaTarefa onAdicionar={onAdicionar} />);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }));
    });

    expect(onAdicionar).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/informe uma tarefa/i);
  });

  it('remove espacos antes de enviar a tarefa', async () => {
    const user = userEvent.setup();
    const onAdicionar = jest.fn();

    render(<NovaTarefa onAdicionar={onAdicionar} />);

    await act(async () => {
      await user.type(screen.getByRole('textbox', { name: /nova tarefa/i }), '  Revisar testes  ');
      await user.click(screen.getByRole('button', { name: /adicionar tarefa/i }));
    });

    expect(onAdicionar).toHaveBeenCalledWith('Revisar testes');
  });
});
