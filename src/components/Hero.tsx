import React, { useEffect, useRef, useState } from 'react';
import { appendUtmParams, TRIAL_CHECKOUT_URL } from '../utils/utm';

interface HeroProps {
  search: string;
}

const SMOKE_VIDEOS = {
  desktop: '/videos/odpplhu4buls7h9e-fumaca-desktop.mp4',
  celular: '/videos/2nt06132pguok0mp-fumaca-celular.mp4',
};

export function Hero({ search }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [athleteSrc, setAthleteSrc] = useState('/imagens/youfit-atleta.webp');
  const [athleteSrcSet, setAthleteSrcSet] = useState<string | undefined>(
    '/imagens/youfit-atleta-320.webp 320w, /imagens/youfit-atleta-460.webp 460w, /imagens/youfit-atleta.webp 622w'
  );

  const checkoutUrl = appendUtmParams(TRIAL_CHECKOUT_URL, search);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lowBandwidth = Boolean(conn && (conn.saveData || /2g|3g/.test(conn.effectiveType || '')));
    const canPlay = video.canPlayType('video/mp4; codecs="avc1.4D401F"');

    if (prefersReducedMotion || lowBandwidth || !canPlay) {
      return;
    }

    let loaded = false;
    const playSafe = () => {
      video.muted = true;
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {});
      }
    };

    const loadSmokeVideo = () => {
      if (loaded) return;
      loaded = true;
      const isMobile = window.matchMedia('(max-width: 1000px)').matches;
      video.src = isMobile ? SMOKE_VIDEOS.celular : SMOKE_VIDEOS.desktop;
      video.load();
      playSafe();
    };

    const onPlaying = () => setVideoVisible(true);
    const onError = () => setVideoVisible(false);

    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        if (!loaded) {
          loadSmokeVideo();
        } else {
          playSafe();
        }
      } else {
        video.pause();
      }
    });
    observer.observe(video);

    const timer = window.setTimeout(loadSmokeVideo, 350);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero${videoVisible ? ' comtela' : ''}`}
      id="topo"
    >
      <div className="cena" aria-hidden="true">
        <span className="brilho" />
        <video
          ref={videoRef}
          className={`fumaca${videoVisible ? ' visivel' : ''}`}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
        />
        <span className="veu" />
        <span className="base" />
        <span className="grao" />
      </div>

      <div className="fundo" aria-hidden="true">
        <svg
          className="nome"
          viewBox="0 0 1800 689"
          width={1800}
          height={689}
          fill="#FFFFFF"
          aria-hidden="true"
        >
          <text
            x="635"
            y="50"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="56"
            letterSpacing="-0.02em"
          >
            YouFit
          </text>
          <text
            x="1352"
            y="174"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="56"
            letterSpacing="-0.02em"
          >
            YouFit
          </text>
          <text
            x="645"
            y="356"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="56"
            letterSpacing="-0.02em"
          >
            YouFit
          </text>
          <text
            x="1257"
            y="584"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="56"
            letterSpacing="-0.02em"
          >
            YouFit
          </text>
        </svg>
        <img
          className="atleta"
          src={athleteSrc}
          srcSet={athleteSrcSet}
          sizes="(max-width: 1000px) 244px, 35vh"
          alt=""
          width={622}
          height={1200}
          fetchPriority="high"
          onError={() => {
            setAthleteSrcSet(undefined);
            setAthleteSrc('/assets/aistudio/Gemini_Generated_Image_cpt46rcpt46rcpt4_905072fc.jpg');
          }}
        />
      </div>

      <div className="topo">
        <h1>
          A plataforma que organiza sua <span className="realce">consultoria online</span>
        </h1>
        <p>
          Cobrança automática, formulários, controle de alunos, treino, dieta, controle financeiro e
          muito mais.
        </p>
        <p className="reforco">
          Atenda 100 alunos com a mesma facilidade que atende 10. Tchau Excel, Google Drive e PDFs
          soltos.
        </p>
        <div className="acoes">
          <a className="botao" href={checkoutUrl}>
            Teste grátis
          </a>
          <span className="nota celular">10 dias grátis, cancele quando quiser.</span>
          <a className="botao vidro" href="#planos">
            Ver planos
          </a>
        </div>
        <span className="nota computador">10 dias grátis, cancele quando quiser.</span>
      </div>
    </section>
  );
}
