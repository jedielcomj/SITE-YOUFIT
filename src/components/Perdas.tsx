import React, { useEffect, useMemo, useRef, useState } from 'react';
import { appendUtmParams, TRIAL_CHECKOUT_URL } from '../utils/utm';

interface PerdasProps {
  search: string;
}

const SYMPTOMS = [
  'Você não sabe dizer agora quanto vai entrar este mês',
  'Já liberou treino para aluno que ainda não tinha pago',
  'Tem Pix na conta que você não sabe de quem é',
  'Fica sem jeito de cobrar o aluno de novo no WhatsApp',
  'Descobre que o plano venceu só quando o aluno some',
];

const SEVERITY_LEVELS = ['Faça o teste', 'Atenção', 'Atenção', 'Alerta', 'Perigo', 'Crítico'];
const SEVERITY_TEXTS = [
  'Se marcou pelo menos uma, tem dinheiro escapando.',
  'Já tem um vazamento no seu financeiro.',
  'Dois vazamentos: o prejuízo já se repete todo mês.',
  'Seu financeiro está trabalhando contra você.',
  'Você está perdendo dinheiro e aluno todo mês.',
  'Sinal vermelho: seu financeiro está fora de controle.',
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const formatBRL = (val: number) => currencyFormatter.format(val);

export function Perdas({ search }: PerdasProps) {
  const [alunos, setAlunos] = useState(40);
  const [valor, setValor] = useState(250);
  const [checked, setChecked] = useState<boolean[]>(() => SYMPTOMS.map(() => false));

  const atrasados = useMemo(() => Math.max(1, Math.round(alunos * 0.1)), [alunos]);
  const perdidos = useMemo(() => Math.max(1, Math.round(alunos * 0.05)), [alunos]);
  const atraso = atrasados * valor;
  const renovacao = perdidos * valor;
  const mensal = atraso + renovacao;
  const anual = mensal * 12;
  const horas = Math.round((alunos * 15) / 60 + 1);

  const [displayedMensal, setDisplayedMensal] = useState(mensal);
  const displayedRef = useRef(mensal);
  const rafRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const startVal = displayedRef.current;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / 450);
      const eased = 1 - Math.pow(1 - t, 3);
      const nextVal = Math.round(startVal + (mensal - startVal) * eased);
      displayedRef.current = nextVal;
      setDisplayedMensal(nextVal);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mensal]);

  const checkedCount = checked.filter(Boolean).length;
  const checkoutUrl = appendUtmParams(TRIAL_CHECKOUT_URL, search);

  const toggleSymptom = (idx: number) => {
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <section className="perdas" id="perdas">
      <div className="cabecalho">
        <span className="selo">Dinheiro na mesa</span>
        <h2>
          Quanto o financeiro bagunçado <span className="realce">te custa por mês?</span>
        </h2>
        <p>
          Pix que o aluno “esqueceu”, plano que venceu e ninguém cobrou, hora perdida conferindo
          comprovante no WhatsApp. Coloque os seus números e veja o tamanho do vazamento.
        </p>
      </div>

      <div className="conteudo">
        <div className="calculo">
          <div className="chamada">
            <span className="mao" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 12h12M16 8l4 4-4 4M8 12H4M8 8l-4 4 4 4" />
              </svg>
            </span>
            <span className="textos">
              <b>Arraste e veja quanto você perde</b>
              <small>Coloque o número de alunos e o valor que você cobra</small>
            </span>
          </div>

          <label className="campo">
            <span className="rotulo">
              Alunos ativos
              <strong>{alunos}</strong>
            </span>
            <input
              type="range"
              min={5}
              max={400}
              step={1}
              value={alunos}
              aria-label="Quantidade de alunos ativos"
              onChange={(e) => setAlunos(Number(e.target.value))}
            />
          </label>

          <label className="campo">
            <span className="rotulo">
              Mensalidade média
              <strong>{formatBRL(valor)}</strong>
            </span>
            <input
              type="range"
              min={80}
              max={800}
              step={10}
              value={valor}
              aria-label="Valor médio da mensalidade"
              onChange={(e) => setValor(Number(e.target.value))}
            />
          </label>

          <ul className="vazamentos">
            <li>
              <span className="gota logo">
                <img
                  src="/imagens/pix-icon.webp"
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="descricao">
                <b>Atraso e calote</b>
                <small>
                  {atrasados}{' '}
                  {atrasados === 1 ? 'aluno atrasa ou some' : 'alunos atrasam ou somem'} sem pagar
                </small>
              </span>
              <span className="valor">-{formatBRL(atraso)}</span>
            </li>

            <li>
              <span className="gota erro">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round">
                  <defs>
                    <linearGradient id="perdas-x" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#FF5A4F" />
                      <stop offset="1" stopColor="#D1161F" />
                    </linearGradient>
                  </defs>
                  <path d="M5 5l14 14M19 5L5 19" stroke="url(#perdas-x)" strokeWidth="5" />
                </svg>
              </span>
              <span className="descricao">
                <b>Renovação esquecida</b>
                <small>
                  {perdidos} {perdidos === 1 ? 'plano vence' : 'planos vencem'} e ninguém lembra de
                  renovar
                </small>
              </span>
              <span className="valor">-{formatBRL(renovacao)}</span>
            </li>

            <li>
              <span className="gota logo">
                <img
                  src="/imagens/9d7p241awbgvb7re-app-whatsapp.webp"
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="descricao">
                <b>Cobrando no WhatsApp</b>
                <small>Conferindo Pix e mandando lembrete</small>
              </span>
              <span className="valor tempo">{horas}h/mês</span>
            </li>
          </ul>

          <div className="total">
            <span className="titulo">Saindo do seu bolso</span>
            <strong className="numero">
              {formatBRL(displayedMensal)}
              <small>/mês</small>
            </strong>
            <span className="ano">
              São <b>{formatBRL(anual)}</b> por ano que você já trabalhou para ganhar e não recebeu.
            </span>
          </div>

          <p className="premissa">
            Estimativa: 1 em cada 10 alunos atrasa ou some sem pagar e 1 em cada 20 não renova
            porque ninguém cobrou. No WhatsApp são uns 15 min por aluno entre lembrete, conferir
            Pix, cobrar atrasado e renovar, mais 1h para fechar o mês. Com a MetaFit a cobrança é
            recorrente e o lembrete sai sozinho.
          </p>
        </div>

        <div className="sinais">
          <h3>Quantas dessas já aconteceram com você?</h3>
          <p className="dica">Toque nas que você já viveu</p>

          <ul data-nivel={checkedCount}>
            {SYMPTOMS.map((label, idx) => {
              const isChecked = checked[idx];
              const isInvite = idx === 0 && checkedCount === 0;
              return (
                <li key={label}>
                  <button
                    type="button"
                    className={`sinal${isChecked ? ' marcado' : ''}${isInvite ? ' convite' : ''}`}
                    aria-pressed={isChecked}
                    onClick={() => toggleSymptom(idx)}
                  >
                    <span className="caixa" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="veredito" data-nivel={checkedCount} aria-live="polite">
            <div className="linha">
              <span className="contagem">{checkedCount}/5</span>
              <span className="textos">
                <small className="grau">{SEVERITY_LEVELS[checkedCount]}</small>
                <b>{SEVERITY_TEXTS[checkedCount]}</b>
              </span>
            </div>
            <div className="termometro" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <i
                  key={n}
                  className={n <= checkedCount ? 'cheio' : ''}
                  style={{ '--n': n } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          <a className={`botao${checkedCount >= 3 ? ' urgente' : ''}`} href={checkoutUrl}>
            Quero parar de perder dinheiro
          </a>
          <span className="nota">10 dias grátis, cancele quando quiser.</span>
        </div>
      </div>
    </section>
  );
}
