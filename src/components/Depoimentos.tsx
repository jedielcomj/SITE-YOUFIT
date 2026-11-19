import React, { useState } from 'react';
import { appendUtmParams, TRIAL_CHECKOUT_URL } from '../utils/utm';

interface DepoimentosProps {
  search: string;
}

interface Testimonial {
  nome: string;
  cargo: string;
  foto: string;
  texto: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    nome: 'Edu Silveira',
    cargo: 'Personal trainer online',
    foto: '/imagens/cmsog8cedes5m1ru-depoimento-edu-silveira-rosto.webp',
    texto:
      '“Eu mandava um PDF feio pelo WhatsApp e tinha planilha de alunos. Sempre acabava esquecendo de cobrar e enviava dieta de um para o outro sem querer. Agora tenho 110 alunos e tá mais fácil do que quando tinha 40. Consigo atender todos sozinho.”',
  },
  {
    nome: 'Flávio',
    cargo: 'Coach · FFC Coaching',
    foto: '/imagens/d65b5oha60aop3vw-depoimento-flavio-ffc.webp',
    texto:
      '“O que eu mais odiava era ficar cobrando aluno, me sentia mal toda vez. Agora o lembrete vai sozinho e o dinheiro cai na conta. Nem lembro a última vez que mandei “oi, e o pagamento?” kkk”',
  },
  {
    nome: 'Diego Camaglio',
    cargo: 'Bodybuilding coach',
    foto: '/imagens/6nhmsw83u6dr4agm-depoimento-diego-camaglio.webp',
    texto:
      '“Em preparação eu mexo na dieta e no treino dos atletas toda semana. Antes era um PDF novo pra cada um, hoje eu ajusto no app e eles já veem. Um atleta até perguntou se eu tinha contratado alguém kkkk”',
  },
  {
    nome: 'Jhow Cabral',
    cargo: 'Coach e Bodybuilder PRO',
    foto: '/imagens/1a3re0cs15uorxyu-depoimento-jhow-cabral-corpo.webp',
    texto:
      '“Gosto muito do quadro dos alunos. Bato o olho e já sei quem tá sumindo, aí chamo antes de cancelar. Só esse mês segurei 4 alunos que iam sair.”',
  },
  {
    nome: 'Rafael Moura',
    cargo: 'Nutricionista esportivo',
    foto: '/imagens/6cuq2frzhncnbbyt-depoimento-rafael-moura-corpo.webp',
    texto:
      '“Tinha medo de trocar de plataforma e virar uma dor de cabeça. Subi a planilha com meus 80 alunos e no mesmo dia tava tudo lá. O suporte me respondeu rapidinho no WhatsApp.”',
  },
  {
    nome: 'Fernanda Alves',
    cargo: 'Personal online · 120 alunos',
    foto: '/imagens/rqj4z201m6vivzui-depoimento-fernanda-alves.webp',
    texto:
      '“Quando vi o relatório levei um susto: tinha uns R$ 3 mil por mês de aluno atrasado que eu nem lembrava. Só isso já paga a MetaFit com sobra.”',
  },
];

const SECOND_ROW = [3, 4, 5, 0, 1, 2].map((idx) => TESTIMONIALS[idx]);
const ROWS = [
  [...TESTIMONIALS, ...TESTIMONIALS],
  [...SECOND_ROW, ...SECOND_ROW],
];

export function Depoimentos({ search }: DepoimentosProps) {
  const [paused, setPaused] = useState(false);
  const checkoutUrl = appendUtmParams(TRIAL_CHECKOUT_URL, search);

  return (
    <section className="depoimentos" id="resultados">
      <div className="texto">
        <span className="selo">Resultados reais</span>
        <h2>
          Quem usa a <span className="realce">MetaFit</span> não volta para as planilhas
        </h2>
        <p>
          Mais alunos e mais tempo livre, sem viver no WhatsApp cobrando. Veja quem já fez a troca.
        </p>
        <a className="botao" href={checkoutUrl}>
          Testar grátis por 10 dias
        </a>
      </div>

      <div
        className={`faixa${paused ? ' parado' : ''}`}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onTouchCancel={() => setPaused(false)}
      >
        {ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className={`trilho ${rowIdx === 0 ? 'ida' : 'volta'}`}>
            {row.map((item, cardIdx) => {
              const isClone = cardIdx >= TESTIMONIALS.length;
              return (
                <div
                  key={`${rowIdx}-${cardIdx}`}
                  className="cartao"
                  aria-hidden={isClone ? 'true' : undefined}
                >
                  <p>{item.texto}</p>
                  <div className="autor">
                    <img
                      src={item.foto}
                      alt={isClone ? '' : item.nome}
                      width={52}
                      height={52}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="dados">
                      <strong>{item.nome}</strong>
                      <span>{item.cargo}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
