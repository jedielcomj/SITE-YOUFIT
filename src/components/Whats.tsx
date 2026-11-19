import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ChatMessage {
  id: number;
  lado: 'sai' | 'entra';
  auto?: boolean;
  etiqueta?: string;
  doc?: {
    nome: string;
    info: string;
  };
  texto: string;
  hora: string;
  lido?: boolean;
}

const SCRIPT: Omit<ChatMessage, 'id' | 'lido'>[] = [
  {
    lado: 'sai',
    auto: true,
    texto: '🎂 Feliz aniversário, Carol! Seu presente: 1 semana de treino bônus já liberada no app 🎁',
    hora: '09:02',
  },
  {
    lado: 'entra',
    texto: 'Que surpresa incrível! Obrigada 😍🙏',
    hora: '09:04',
  },
  {
    lado: 'sai',
    auto: true,
    doc: { nome: 'Feedback semanal', info: 'Formulário · 6 perguntas · 2 min' },
    texto: 'Oi Carol! Falta só o seu feedback da semana para eu ajustar o treino 📋',
    hora: '10:15',
  },
  {
    lado: 'entra',
    texto: 'Respondido! ✅',
    hora: '10:21',
  },
  {
    lado: 'sai',
    auto: true,
    texto: '📈 Sua evolução do mês: -2,5 kg e +12% de carga no agachamento. Bora manter! 🔥',
    hora: '18:30',
  },
  {
    lado: 'entra',
    texto: 'Tô muito feliz com o resultado 😭💪',
    hora: '18:32',
  },
  {
    lado: 'sai',
    auto: true,
    etiqueta: 'Mensagem pronta',
    texto: '📸 Lembrete: amanhã é dia de mandar as fotos de check-in no app. Qualquer dúvida é só chamar!',
    hora: '20:00',
  },
];

export function Whats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMessages(SCRIPT.map((item, idx) => ({ ...item, id: idx + 1, lido: true })));
      return;
    }

    let timer = 0;
    let step = 0;
    let seq = 0;
    let running = false;

    const schedule = (ms: number, fn: () => void) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fn, ms);
    };

    const advance = () => {
      if (!running) return;
      if (step >= SCRIPT.length) {
        schedule(2500, () => {
          setFading(true);
          schedule(450, () => {
            setMessages([]);
            setFading(false);
            step = 0;
            schedule(500, advance);
          });
        });
        return;
      }

      const next = SCRIPT[step];
      if (next.lado === 'entra') {
        setTyping(true);
        schedule(800, () => {
          setTyping(false);
          setMessages((prev) => [
            ...prev.map((m) => (m.lado === 'sai' ? { ...m, lido: true } : m)),
            { ...next, id: seq++, lido: false },
          ]);
          step += 1;
          schedule(600, advance);
        });
      } else {
        schedule(350, () => {
          setMessages((prev) => [...prev, { ...next, id: seq++, lido: false }]);
          step += 1;
          schedule(1200, advance);
        });
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      advance();
    };

    const stop = () => {
      running = false;
      window.clearTimeout(timer);
    };

    const el = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (el && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
          } else {
            stop();
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
    } else {
      start();
    }

    return () => {
      stop();
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="whats" id="whatsapp">
      <div className="conteudo">
        <div className="lado">
          <div className="topo">
            <span className="selo">Integração com WhatsApp</span>
            <h2>
              Seu <span className="zap">WhatsApp</span> trabalhando{' '}
              <span className="realce">no automático</span>
            </h2>
            <p>
              Parabéns no aniversário, cobrança de formulário, avisos de evolução e mensagens prontas
              saem sozinhos para o aluno. Você não digita nada e o aluno sente que você está sempre
              por perto.
            </p>
          </div>
        </div>

        <div className="cena" aria-hidden="true">
          <span className="aura" />
          <div className="aparelho">
            <div className="tela">
              <span className="ilha" />
              <div className="status">
                <span className="hora">9:41</span>
                <span className="sinais">
                  <svg viewBox="0 0 18 12" fill="currentColor">
                    <rect x="0" y="8" width="3" height="4" rx="1" />
                    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                    <rect x="10" y="3" width="3" height="9" rx="1" />
                    <rect x="15" y="0" width="3" height="12" rx="1" />
                  </svg>
                  <svg viewBox="0 0 16 12" fill="currentColor">
                    <path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.4-1.5C13.2 1.5 10.7.5 8 .5S2.8 1.5.9 3.3l1.4 1.5C3.8 3.4 5.8 2.6 8 2.6zm0 3.5c1.2 0 2.4.5 3.2 1.3l1.4-1.5C11.4 4.7 9.8 4 8 4s-3.4.7-4.6 1.9l1.4 1.5c.8-.8 2-1.3 3.2-1.3zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.8l1.5-1.7c-.4-.4-.9-.6-1.5-.6z" />
                  </svg>
                  <svg viewBox="0 0 27 12" fill="none">
                    <rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.4" />
                    <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
                    <path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4z" fill="currentColor" opacity="0.4" />
                  </svg>
                </span>
              </div>

              <div className="cabeca">
                <span className="voltar">
                  <svg
                    viewBox="0 0 12 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 2L2 10l8 8" />
                  </svg>
                  <b>12</b>
                </span>
                <span className="foto">C</span>
                <span className="contato">
                  <b>Carol Mendes</b>
                  <small className={typing ? 'digitando' : ''}>
                    {typing ? 'digitando...' : 'online'}
                  </small>
                </span>
                <span className="acoes">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2.5" y="6" width="13" height="12" rx="3" />
                    <path d="M15.5 10.5l5-3v9l-5-3" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 7.7 7.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z" />
                  </svg>
                </span>
              </div>

              <div className="conversa">
                <div className={`mensagens${fading ? ' sumindo' : ''}`}>
                  <span className="cripto">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9z" />
                    </svg>
                    As mensagens são protegidas com a criptografia de ponta a ponta.
                  </span>

                  <span className="dia">Hoje</span>

                  <div className="lista">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 12, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                          className={`bolha ${msg.lado}`}
                        >
                          {msg.auto && (
                            <span className="auto">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                              </svg>
                              {' ' + (msg.etiqueta || 'Automático MetaFit')}
                            </span>
                          )}

                          {msg.doc && (
                            <div className="doc">
                              <span className="pdf form">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect x="5" y="4" width="14" height="17" rx="2" />
                                  <path d="M9 4V3h6v1M8.5 10l1.5 1.5L13 8.5M8.5 16l1.5 1.5L13 14.5M15 10h1M15 16h1" />
                                </svg>
                              </span>
                              <span className="arquivo">
                                <b>{msg.doc.nome}</b>
                                <small>{msg.doc.info}</small>
                              </span>
                            </div>
                          )}

                          <p>
                            {msg.texto}
                            <span className="espaco" />
                          </p>

                          <span className="meta">
                            {msg.hora + ' '}
                            {msg.lado === 'sai' && (
                              <svg
                                className={msg.lido ? 'lido' : ''}
                                viewBox="0 0 18 11"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 6l3.5 3.5L11.5 2" />
                                <path d="M7.5 9.5L16.5 1.5" />
                              </svg>
                            )}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {typing && (
                    <div className="bolha entra pontos">
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                </div>
              </div>

              <div className="rodape">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="campo">
                  Mensagem
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
                  </svg>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                  <circle cx="12" cy="12.5" r="3.5" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
                </svg>
              </div>
              <span className="barra" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
