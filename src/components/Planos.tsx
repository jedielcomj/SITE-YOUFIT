import React, { useState } from 'react';
import { appendUtmParams } from '../utils/utm';
import { IconCheck } from './Icons';

interface PlanosProps {
  search: string;
}

interface PlanItem {
  chave: string;
  nome: string;
  destaque?: boolean;
  resumo: string;
  mensal: number;
  anual: string;
  total: number;
  linkM: string;
  linkA: string;
  titulo: string;
  itens: string[];
}

const CHECKOUT_BASE = 'https://checkout.metafit.cc/?plan=';

const PLANS: PlanItem[] = [
  {
    chave: 's',
    nome: 'Starter',
    resumo: 'Para quem está profissionalizando a operação agora.',
    mensal: 67,
    anual: '55,83',
    total: 670,
    linkM: `${CHECKOUT_BASE}cc6c4f0d-fd0f-4bf8-bab8-3820be787c22`,
    linkA: `${CHECKOUT_BASE}5cf3fd4a-10e5-4f08-ba0f-b75eb59ba1c5`,
    titulo: 'Incluso',
    itens: [
      'Até 25 alunos',
      'Construtor de treinos, com vídeos próprios',
      'Construtor de dietas',
      'Lembretes automáticos',
      'Gestão de pagamentos e cobrança automática',
      'Anamnese personalizada',
      'Kanban estilo Trello',
      'App MetaFit para alunos, gratuito',
    ],
  },
  {
    chave: 'p',
    nome: 'Pro',
    destaque: true,
    resumo: 'Para quem quer crescer com estratégia, não só com esforço.',
    mensal: 97,
    anual: '80,83',
    total: 970,
    linkM: `${CHECKOUT_BASE}f8458ef4-2068-473e-bee5-de0c9349552d`,
    linkA: `${CHECKOUT_BASE}0cb91a9b-dc7b-4e0b-88a3-0ac652828306`,
    titulo: 'Tudo do Starter, mais',
    itens: [
      'Até 50 alunos',
      'Feedbacks personalizados',
      'Ranking de engajamento de alunos',
      'Formulários personalizados',
      'Cupons de desconto',
      'Afiliados da consultoria',
      'Integração com Google Agenda',
      'Trackeamento de links',
    ],
  },
  {
    chave: 'b',
    nome: 'Elite',
    resumo: 'Para a consultoria que opera em escala.',
    mensal: 117,
    anual: '97,50',
    total: 1170,
    linkM: `${CHECKOUT_BASE}90f369c3-670e-4859-9d43-f6333392beaf`,
    linkA: `${CHECKOUT_BASE}bb6c8186-c526-4658-b594-536c19e96ba8`,
    titulo: 'Tudo do Pro, mais',
    itens: [
      'Alunos ilimitados',
      'Múltiplas consultorias',
      'WhatsApp: mensagens e disparo automático',
      'Gestão de colaboradores',
      'Todas as aulas do módulo desbloqueadas',
      'Suporte prioritário',
    ],
  },
];

export function Planos({ search }: PlanosProps) {
  const [anual, setAnual] = useState(false);

  return (
    <section className="planos" id="planos">
      <div className="cabecalho">
        <span className="selo">Planos</span>
        <h2>
          Escolha o plano perfeito <span className="realce">para você</span>
        </h2>
        <p>Comece grátis. Sem fidelidade. Cancele quando quiser.</p>
      </div>

      <div className="periodo">
        <button
          type="button"
          className={`opcao${!anual ? ' ativo' : ''}`}
          aria-pressed={!anual}
          onClick={() => setAnual(false)}
        >
          Mensal
        </button>
        <button
          type="button"
          className={`opcao${anual ? ' ativo' : ''}`}
          aria-pressed={anual}
          onClick={() => setAnual(true)}
        >
          Anual <span className="bonus">2 meses grátis</span>
        </button>
      </div>

      <div className="lista">
        {PLANS.map((plan) => {
          const checkoutHref = appendUtmParams(anual ? plan.linkA : plan.linkM, search);
          return (
            <article
              key={plan.chave}
              className={`plano cartao${plan.destaque ? ' destaque' : ''}`}
            >
              {plan.destaque && <span className="popular">Mais popular</span>}
              <h3>{plan.nome}</h3>
              <p className="resumo">{plan.resumo}</p>

              <div className="preco">
                <span className="antes">{anual ? `R$${plan.mensal}/mês` : ''}</span>
                <div className="valor">
                  <span className="moeda">R$</span>
                  <strong>{anual ? plan.anual : plan.mensal}</strong>
                  <span className="mes">/mês</span>
                </div>
                <span className="cobranca">
                  {anual
                    ? `Cobrado como R$${plan.total.toLocaleString('pt-BR')}/ano`
                    : 'Cobrado mês a mês'}
                </span>
              </div>

              <a className={`botao${plan.destaque ? '' : ' vidro'}`} href={checkoutHref}>
                Começar grátis por 10 dias
              </a>

              <span className="titulo">{plan.titulo}</span>
              <ul>
                {plan.itens.map((item) => (
                  <li key={item}>
                    <IconCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
