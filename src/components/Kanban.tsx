import React, { useEffect, useRef } from 'react';
import { BrowserLockIcon, IconArrowRight, IconCheck } from './Icons';

const KANBAN_BULLETS = [
  'Etapas do seu jeito: anamnese, plano em criação, plano criado, ajustes e feedback',
  'Ícones no card mostram o que já foi entregue: anamnese, fotos, dieta, treino e cardio',
  'Chat e WhatsApp direto do card, sem procurar o contato',
  'Um funil para cada produto ou mentoria que você vende',
];

export function Kanban() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const activateVideos = () => {
      section.querySelectorAll<HTMLVideoElement>('video[data-src]').forEach((video) => {
        if (video.offsetParent === null) return;
        if (video.dataset.poster) {
          video.poster = video.dataset.poster;
        }
        if (video.dataset.src) {
          video.src = video.dataset.src;
          video.removeAttribute('data-src');
        }
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          activateVideos();
        }
      },
      { rootMargin: '1500px 0px' }
    );
    observer.observe(section);

    const timer = window.setTimeout(activateVideos, 1200);
    window.addEventListener('resize', activateVideos);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener('resize', activateVideos);
    };
  }, []);

  return (
    <section ref={sectionRef} className="kanban" id="kanban">
      <div className="conteudo">
        <div className="cena">
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
                  app.metafit.cc/kanban
                </span>
              </div>
              <video
                className="filme"
                data-src="/videos/xymhhfnjfly5j8mo-kanban3-desktop.mp4"
                data-poster="/imagens/cari4yln7r9yre03-kanban3-desktop-poster.webp"
                poster="/imagens/cari4yln7r9yre03-kanban3-desktop-poster.webp"
                width={1280}
                height={788}
                muted
                loop
                playsInline
                preload="none"
                aria-label="Quadro Kanban da MetaFit com alunos sendo arrastados entre as etapas"
              />
            </div>
          </div>

          <div className="celular">
            <div className="quadro">
              <video
                className="filme"
                data-src="/videos/kbeson7n9cor2h1n-kanban3-celular.mp4"
                data-poster="/imagens/6my0d49rp8tzfm6x-kanban3-celular-poster.webp"
                poster="/imagens/6my0d49rp8tzfm6x-kanban3-celular-poster.webp"
                width={960}
                height={491}
                muted
                loop
                playsInline
                preload="none"
                aria-label="Cards de alunos sendo arrastados entre as etapas do Kanban"
              />
            </div>
          </div>
        </div>

        <div className="texto">
          <span className="selo">Kanban de alunos</span>
          <h2>Veja em que etapa cada aluno está</h2>
          <p>
            Cada aluno vira um card no quadro, da anamnese à entrega do plano. Arraste de uma etapa
            para a outra e saiba na hora quem está esperando por você, sem planilha e sem lista no
            bloco de notas.
          </p>
          <ul>
            {KANBAN_BULLETS.map((item) => (
              <li key={item}>
                <span className="marca">
                  <IconCheck />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a className="link" href="#planos">
            Organize seus alunos num quadro só
            <IconArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
