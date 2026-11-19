import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IconBolt, StatusSignalIcons } from './Icons';

interface CardItem {
  num: string;
  tipo: 'tela' | 'filmado' | 'avisos' | 'slider';
  titulo: string;
  texto: string;
  imagem?: string;
  reserva?: string;
  alt?: string;
  video?: string;
  poster?: string;
  antes?: string;
  depois?: string;
  inversa?: boolean;
}

const CARDS: CardItem[] = [
  {
    num: '01',
    tipo: 'tela',
    titulo: 'Dashboard',
    imagem: '/imagens/youfit-dashboard.webp',
    reserva: '/assets/aistudio/image_5f0d89a6.png',
    alt: 'Tela inicial do app YouFit com fichas de treino, progresso da semana e treino do dia',
    texto:
      'Tudo do dia numa tela só: treino, dieta, hidratação e próximos treinos. O aluno abre o app e sabe exatamente o que fazer hoje, sem depender de mensagem sua.',
  },
  {
    num: '02',
    tipo: 'tela',
    inversa: true,
    titulo: 'Tela de treino',
    imagem: '/imagens/k7t2thumbsl1-claro-treino-lista.webp',
    reserva: '/imagens/reserva/screen-3.jpeg',
    alt: 'Treino A de quadríceps com os exercícios do dia e um bi-set',
    texto:
      'O treino do dia do jeito que você prescreveu: exercícios em ordem, bi-sets e observações. O aluno abre o app, vê o que tem para hoje e começa com um toque.',
  },
  {
    num: '03',
    tipo: 'tela',
    titulo: 'Registro das séries',
    imagem: '/imagens/k7t2thumbss1-claro-treino-serie.webp',
    reserva: '/imagens/reserva/screen-3.jpeg',
    alt: 'Série em andamento com carga, repetições e a série anterior para comparar',
    texto:
      'A cada série, o aluno anota a carga e as repetições que fez e marca como concluída, vendo o que fez na última vez para tentar superar. Você acompanha a evolução de carga sem precisar perguntar.',
  },
  {
    num: '04',
    tipo: 'tela',
    inversa: true,
    titulo: 'Tela de dieta',
    imagem: '/imagens/nvrqr3ew6m7vaya0-claro-dieta.webp',
    reserva: '/imagens/reserva/screen-5.jpeg',
    alt: 'Dieta do aluno com refeições do dia, calorias e macros de cada uma',
    texto:
      'Refeições, macros, substituições e recados do treinador dentro do app. Chega de PDF perdido na conversa do WhatsApp.',
  },
  {
    num: '05',
    tipo: 'tela',
    titulo: 'Substituições',
    imagem: '/imagens/8wtzc0j4e4g06ly1-claro-substituicao-almoco.webp',
    reserva: '/imagens/nvrqr3ew6m7vaya0-claro-dieta.webp',
    alt: 'Opções de troca no almoço: peito de frango por carne moída, tilápia ou peito de peru',
    texto:
      'Enjoou do frango? O aluno toca no alimento e vê as trocas que você já deixou aprovadas, na quantidade certa: patinho, tilápia ou peito de peru. A dieta continua no plano e você não recebe mais aquela mensagem perguntando o que pode comer no lugar.',
  },
  {
    num: '06',
    tipo: 'filmado',
    inversa: true,
    titulo: 'Biomecânica',
    imagem: '/imagens/z40dy68o70dzazom-claro-video-supino-3.webp',
    video: '/videos/7uyck1b36uynvtrk-supino-inclinado.mp4',
    poster: '/imagens/4hoouve4903mk5wr-supino-poster.webp',
    alt: 'Vídeo de execução do supino inclinado máquina enviado pelo treinador',
    texto:
      'Cada exercício com vídeo de execução e orientação de técnica. O aluno treina certo mesmo longe de você, e erra muito menos.',
  },
  {
    num: '07',
    tipo: 'avisos',
    titulo: 'Notificações',
    texto:
      'Treino liberado, dieta atualizada, pagamento confirmado: o aluno e você são avisados na hora, sem ninguém precisar mandar mensagem.',
  },
  {
    num: '08',
    tipo: 'slider',
    inversa: true,
    titulo: 'Comparativo de fotos',
    antes: '/imagens/zlotbbzaupte4xp8-claro-fotos-antes-julia.webp',
    depois: '/imagens/6w3lllsgoxl5wtgw-claro-fotos-depois-julia.webp',
    alt: 'Slider comparando a foto de antes e a de depois do aluno',
    texto:
      'Fotos de frente, lado e costas lado a lado, com peso e data. O aluno vê o resultado acontecendo, e resultado visível é o que faz ele renovar.',
  },
  {
    num: '09',
    tipo: 'tela',
    titulo: 'Histórico',
    imagem: '/imagens/gtjfknunefz0cbwh-claro-historico.webp',
    reserva: '/imagens/reserva/screen-4.jpeg',
    alt: 'Histórico de treinos do aluno em calendário, com treinos e volume do mês',
    texto:
      'Treinos, dietas e manipulados anteriores guardados no perfil do aluno. A evolução completa em segundos, sem procurar em conversa antiga.',
  },
];

interface LockNotification {
  quando: string;
  titulo: string;
  texto: string;
}

const NOTIFICATIONS: LockNotification[] = [
  { quando: 'agora', titulo: 'Treino D liberado', texto: 'Seu treinador atualizou sua ficha' },
  { quando: 'há 5 min', titulo: 'Plano alimentar atualizado', texto: 'Nova refeição às 10:00' },
  { quando: 'há 30 min', titulo: 'Pagamento confirmado', texto: 'Plano mensal · R$ 297,00' },
  { quando: 'ontem', titulo: 'Hora da foto de evolução', texto: 'Registre seu progresso desta semana' },
];

const REVERSE_NOTIFICATIONS = NOTIFICATIONS.slice().reverse();
const RELATIVE_TIMES = ['agora', 'há 2 min', 'há 5 min', 'há 12 min'];

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

export function Cartas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fixoRef = useRef<HTMLDivElement | null>(null);
  const baralhoRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef<HTMLDivElement | null>(null);
  const clipVideoRef = useRef<HTMLVideoElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [dateLabel, setDateLabel] = useState('Sábado, 17 de outubro');
  const [arrived, setArrived] = useState<LockNotification[]>(NOTIFICATIONS);
  const [screenLit, setScreenLit] = useState(true);
  const [sliderPos, setSliderPos] = useState<number | null>(null);

  useEffect(() => {
    try {
      const formatted = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      setDateLabel(formatted.charAt(0).toUpperCase() + formatted.slice(1));
    } catch {
      // keep fallback date
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) return;

    const sectionEl = sectionRef.current;
    const fixoEl = fixoRef.current;
    const baralhoEl = baralhoRef.current;
    if (!sectionEl || !fixoEl || !baralhoEl) return;

    const cards = Array.from(baralhoEl.querySelectorAll<HTMLElement>('.carta'));
    let isMobile = false;
    let hideOffset = 0;
    let rafId = 0;
    let prevWidth = 0;
    let stableHeight = 0;

    const stackStep = () => (isMobile ? 4 : 10);
    const stackOffset = (idx: number) => Math.min(idx, 3) * stackStep();

    const adjustLayout = () => {
      const count = cards.length;
      if (!isMobile) {
        fixoEl.style.paddingTop = '';
        baralhoEl.style.height = '';
        cards.forEach((c) => {
          const device = c.querySelector<HTMLElement>('.aparelho');
          if (device) device.style.height = '';
        });
        return;
      }

      let headerBottom = 0;
      const headerEl = document.querySelector('header');
      if (headerEl && getComputedStyle(headerEl).position === 'fixed') {
        headerBottom = headerEl.getBoundingClientRect().bottom;
      }

      const topPad = Math.max(12, Math.round(headerBottom + 10));
      fixoEl.style.paddingTop = `${topPad}px`;
      const fixoHeight = fixoEl.clientHeight;
      hideOffset = fixoHeight + 30;
      baralhoEl.style.height = `${Math.max(300, fixoHeight - topPad - stackOffset(count - 1) - 10)}px`;

      cards.forEach((card) => {
        const textEl = card.querySelector<HTMLElement>('.texto');
        const deviceEl = card.querySelector<HTMLElement>('.aparelho');
        if (!textEl || !deviceEl) return;
        const styles = getComputedStyle(card);
        const innerHeight =
          card.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
        const gap = parseFloat(styles.rowGap) || 12;
        const maxDeviceHeight = Math.floor(innerHeight - textEl.offsetHeight - gap - 4);
        deviceEl.style.height = `${Math.max(120, maxDeviceHeight)}px`;
      });
    };

    const updateTransforms = () => {
      const count = cards.length;
      const rect = sectionEl.getBoundingClientRect();
      const fixoHeight = fixoEl.clientHeight || window.innerHeight;
      const scrollable = rect.height - fixoHeight;
      if (!(scrollable > 0)) return;

      const progress = clamp(-rect.top / scrollable) * (count - 1 + 0.4);
      const enterStart = isMobile ? hideOffset : fixoHeight * 0.78;

      cards.forEach((card, idx) => {
        let translateY = 0;
        if (idx > 0) {
          const t = clamp(progress - (idx - 1));
          translateY = (1 - t) * enterStart + t * stackOffset(idx);
        }
        const cover = idx < count - 1 ? clamp(progress - idx) : 0;
        const scale = 1 - 0.04 * cover;
        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.setProperty('--cob', String(cover));
        card.style.zIndex = String(idx + 1);
      });
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          updateTransforms();
        });
      }
    };

    const onResize = (ev?: Event) => {
      isMobile = window.matchMedia('(max-width: 1000px)').matches;
      const w = window.innerWidth;
      if (isMobile && ev && ev.type === 'resize' && w === prevWidth && stableHeight) return;
      if (!stableHeight || w !== prevWidth) {
        stableHeight = window.innerHeight;
      }
      prevWidth = w;
      const totalDvh = 100 + Math.round((cards.length - 1 + 0.4) * 78);
      sectionEl.style.height = isMobile
        ? `${Math.round((stableHeight * totalDvh) / 100)}px`
        : `${totalDvh}dvh`;
      fixoEl.style.height = isMobile ? `${stableHeight}px` : '';
      adjustLayout();
      updateTransforms();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => onResize());
    }
    const timers = [300, 1000, 2500].map((ms) => window.setTimeout(() => onResize(), ms));

    const imgLoadHandlers: Array<{ img: HTMLImageElement; fn: () => void }> = [];
    cards.forEach((card) => {
      card.querySelectorAll('img').forEach((img) => {
        if (!img.complete) {
          const fn = () => adjustLayout();
          img.addEventListener('load', fn);
          imgLoadHandlers.push({ img, fn });
        }
      });
    });

    const resizeObs = new ResizeObserver(adjustLayout);
    cards.forEach((card) => {
      const t = card.querySelector('.texto');
      if (t) resizeObs.observe(t);
    });

    // Video clip loader in Card 06
    const clip = clipVideoRef.current;
    let videoObs: IntersectionObserver | null = null;
    if (clip) {
      const startClip = () => {
        if (!clip.src && clip.dataset.src) {
          clip.src = clip.dataset.src;
          clip.removeAttribute('data-src');
        }
        const p = clip.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      };
      videoObs = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            startClip();
          } else {
            clip.pause();
          }
        },
        { rootMargin: '600px 0px' }
      );
      videoObs.observe(sectionEl);
    }

    // Lock screen notifications cycle in Card 07
    let notifTimer = 0;
    let lockObs: IntersectionObserver | null = null;
    const clearNotifTimer = () => {
      window.clearTimeout(notifTimer);
      notifTimer = 0;
    };

    const stepNotifications = (currentCount: number) => {
      if (currentCount >= REVERSE_NOTIFICATIONS.length) {
        setArrived([]);
        setScreenLit(false);
        notifTimer = window.setTimeout(() => stepNotifications(0), 1200);
        return;
      }
      setScreenLit(true);
      const nextCount = currentCount + 1;
      const slice = REVERSE_NOTIFICATIONS.slice(0, nextCount).reverse();
      setArrived(slice);
      notifTimer = window.setTimeout(
        () => stepNotifications(nextCount),
        nextCount === REVERSE_NOTIFICATIONS.length ? 4200 : 1600
      );
    };

    const startNotifications = () => {
      clearNotifTimer();
      setArrived([]);
      setScreenLit(false);
      notifTimer = window.setTimeout(() => stepNotifications(0), 500);
    };

    if (lockRef.current) {
      lockObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!notifTimer) startNotifications();
            } else {
              clearNotifTimer();
            }
          });
        },
        { threshold: 0.45 }
      );
      lockObs.observe(lockRef.current);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      timers.forEach((id) => window.clearTimeout(id));
      imgLoadHandlers.forEach(({ img, fn }) => img.removeEventListener('load', fn));
      resizeObs.disconnect();
      videoObs?.disconnect();
      lockObs?.disconnect();
      clearNotifTimer();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSliderPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(88, Math.max(12, ((e.clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section ref={sectionRef} className={`cartas${reducedMotion ? ' parada' : ''}`} id="app">
      <div className="cabecalho movel">
        <span className="selo">O app do aluno</span>
        <h2>
          Tudo que o seu aluno precisa, <span className="realce">num único app</span>
        </h2>
      </div>

      <div ref={fixoRef} className="fixo">
        <div className="cabecalho">
          <span className="selo">O app do aluno</span>
          <h2>
            Tudo que o seu aluno precisa, <span className="realce">num único app</span>
          </h2>
        </div>

        <div ref={baralhoRef} className="baralho">
          {CARDS.map((card) => (
            <article key={card.num} className={`carta${card.inversa ? ' inversa' : ''}`}>
              <div className="texto">
                <span className="numero">{card.num}</span>
                <h3>{card.titulo}</h3>
                <p>{card.texto}</p>
              </div>

              <div className="visual">
                {card.tipo === 'tela' && (
                  <div className="tela aparelho">
                    <span className="camara" aria-hidden="true" />
                    <img
                      src={card.imagem}
                      alt={card.alt}
                      width={560}
                      height={1235}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        if (card.reserva && !e.currentTarget.dataset.fallbackApplied) {
                          e.currentTarget.dataset.fallbackApplied = '1';
                          e.currentTarget.src = card.reserva;
                        }
                      }}
                    />
                  </div>
                )}

                {card.tipo === 'filmado' && (
                  <div className="filmado aparelho">
                    <span className="camara" aria-hidden="true" />
                    <div className="quadro">
                      <img
                        src={card.imagem}
                        alt={card.alt}
                        width={560}
                        height={1235}
                        loading="lazy"
                        decoding="async"
                      />
                      <video
                        ref={clipVideoRef}
                        className="clipe"
                        data-src={card.video}
                        poster={card.poster}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}

                {card.tipo === 'avisos' && (
                  <div className="avisos aparelho">
                    <div ref={lockRef} className={`bloqueio${screenLit ? ' acesa' : ''}`}>
                      <span className="ilha" aria-hidden="true" />
                      <div className="status" aria-hidden="true">
                        <span>Vivo</span>
                        <StatusSignalIcons />
                      </div>
                      <div className="relogio" aria-hidden="true">
                        <span className="data">{dateLabel}</span>
                        <span className="hora">9:41</span>
                      </div>
                      <div className="pilha">
                        <AnimatePresence initial={false}>
                          {arrived.map((item, idx) => (
                            <motion.div
                              key={item.titulo}
                              layout
                              initial={{ opacity: 0, y: -18, scale: 0.92 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.96 }}
                              transition={{ duration: 0.42, ease: [0.2, 0.9, 0.3, 1.15] }}
                              className="aviso"
                            >
                              <span className="marca" aria-hidden="true">
                                <IconBolt />
                              </span>
                              <div className="corpo">
                                <span className="linha">
                                  <b>MetaFit</b>
                                  <small>{RELATIVE_TIMES[idx] || item.quando}</small>
                                </span>
                                <strong>{item.titulo}</strong>
                                <span className="msg">{item.texto}</span>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <div className="atalhos" aria-hidden="true">
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 2h8l-1 6H9L8 2zM9 8h6v13a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V8zM12 13v2" />
                          </svg>
                        </span>
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
                            <circle cx="12" cy="13" r="3.5" />
                          </svg>
                        </span>
                      </div>
                      <span className="barra" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {card.tipo === 'slider' && (
                  <div className="slider aparelho">
                    <span className="camara" aria-hidden="true" />
                    <div
                      className={`quadro comparar${sliderPos !== null ? ' manual' : ''}`}
                      style={
                        {
                          '--px': '4.32%',
                          '--py': '29.92%',
                          '--pw': '91.35%',
                          '--ph': '55.23%',
                          ...(sliderPos !== null ? { '--pos': `${sliderPos}%` } : {}),
                        } as React.CSSProperties
                      }
                      onPointerDown={handleSliderPointer}
                      onPointerMove={(e) => {
                        if (e.buttons === 1 || e.pointerType === 'mouse') {
                          handleSliderPointer(e);
                        }
                      }}
                      onPointerLeave={() => setSliderPos(null)}
                    >
                      <img
                        src={card.depois}
                        alt={card.alt}
                        width={560}
                        height={1235}
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        className="antes"
                        src={card.antes}
                        alt=""
                        width={560}
                        height={1235}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="divisa" aria-hidden="true">
                        <span className="alca">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
