import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrowserLockIcon, IconArrowRight, IconBolt, IconCheck, StatusSignalIcons } from './Icons';

const PAYMENTS = [
  { nome: 'Julia Buckoski', produto: 'Plano Trimestral', valor: 'R$ 549,00' },
  { nome: 'Ana Paula', produto: 'Plano Hipertrofia 3M', valor: 'R$ 297,00' },
  { nome: 'Marco Antônio', produto: 'Consultoria Mensal', valor: 'R$ 189,00' },
];

const WHEN_LABELS = ['agora', 'há 1 min', 'há 3 min'];

const PAY_BULLETS = [
  'Cobrança recorrente todo mês, sem você lembrar ninguém',
  'Saldo disponível e pendente atualizados na hora',
  'Pagamentos manuais registrados no mesmo painel',
];

export function Pay() {
  const [active, setActive] = useState({ id: 0, index: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let nextIdx = 1;
    let seq = 1;
    const timer = window.setInterval(() => {
      setActive({ id: seq++, index: nextIdx });
      nextIdx = (nextIdx + 1) % PAYMENTS.length;
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const current = PAYMENTS[active.index];

  return (
    <section className="pay" id="pay">
      <div className="conteudo">
        <div className="texto">
          <span className="selo">Recebimento automático</span>
          <h2>O dinheiro do aluno cai sozinho na sua conta</h2>
          <p>
            O aluno paga por Pix ou cartão pelo MetaFit Pay e o valor entra no seu saldo sem você
            cobrar ninguém. No painel você vê o que já está pronto para saque, o que ainda vai
            liberar e quem pagou.
          </p>
          <ul>
            {PAY_BULLETS.map((item) => (
              <li key={item}>
                <span className="marca">
                  <IconCheck />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a className="link" href="#planos">
            Automatize as cobranças da sua consultoria
            <IconArrowRight />
          </a>
        </div>

        <div className="cena">
          {/* Mobile mockup */}
          <div className="celular">
            <div className="avisos" aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: -36, scale: 0.35 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 28, scale: 0.94 }}
                  transition={{ duration: 0.52, ease: [0.2, 0.9, 0.3, 1.12] }}
                  className="aviso"
                >
                  <span className="app">
                    <IconBolt />
                  </span>
                  <span className="corpo">
                    <span className="linha">
                      <b>MetaFit</b>
                      <small>{WHEN_LABELS[0]}</small>
                    </span>
                    <strong>Pagamento recebido</strong>
                    <span className="msg">
                      {current.nome} · {current.produto} · + {current.valor}
                    </span>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="aparelho">
              <div className="tela">
                <div className="status" aria-hidden="true">
                  <b>9:41</b>
                  <span className="ilha" />
                  <StatusSignalIcons />
                </div>
                <img
                  src="/imagens/ighi5rz5oj0q2bhb-claro-financeiro-celular.webp"
                  alt="Financeiro da MetaFit no celular com saldo disponível, saldo pendente e os pagamentos dos alunos"
                  width={900}
                  height={1602}
                  loading="lazy"
                  decoding="async"
                />
                <span className="barra" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Desktop mockup */}
          <div className="computador">
            <div className="janela">
              <div className="topo" aria-hidden="true">
                <span className="bolas">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="endereco">
                  <BrowserLockIcon />
                  app.metafit.cc/financeiro
                </span>
              </div>
              <img
                src="/imagens/n4j9ck7zhgwx58t5-claro-financeiro-desktop.webp"
                alt="Painel Financeiro da MetaFit no computador com saldos, botões de saque e a lista de transações dos alunos"
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="avisos" aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 64, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 32, scale: 0.94 }}
                  transition={{ duration: 0.52, ease: [0.2, 0.9, 0.3, 1.12] }}
                  className="aviso"
                >
                  <span className="app">
                    <IconBolt />
                  </span>
                  <span className="corpo">
                    <span className="linha">
                      <b>MetaFit</b>
                      <small>{WHEN_LABELS[0]}</small>
                    </span>
                    <strong>Pagamento recebido</strong>
                    <span className="msg">
                      {current.nome} comprou {current.produto} · + {current.valor}
                    </span>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
