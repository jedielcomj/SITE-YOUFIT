import React from 'react';
import { IconArrowRight } from './Icons';

interface FloatingApp {
  name: string;
  image?: string;
  isSvgDoc?: boolean;
  x: string;
  y: string;
  xm: string;
  ym: string;
  r: string;
  d: string;
  b: string;
  c: string;
}

const FLOATING_APPS: FloatingApp[] = [
  {
    name: 'Planilhas',
    image: '/imagens/3monbtcpa14amc4z-app-planilhas2.webp',
    x: '-390px',
    y: '-150px',
    xm: '-110px',
    ym: '-165px',
    r: '-8deg',
    d: '0s',
    b: '0s',
    c: '#FF6B6B',
  },
  {
    name: 'Excel',
    image: '/imagens/vkj9k94p01q21cmk-app-excel3.webp',
    x: '-205px',
    y: '-190px',
    xm: '-42px',
    ym: '-78px',
    r: '6deg',
    d: '0.012s',
    b: '0.33s',
    c: '#8B5CF6',
  },
  {
    name: 'Google Docs',
    isSvgDoc: true,
    x: '10px',
    y: '-200px',
    xm: '42px',
    ym: '-78px',
    r: '-4deg',
    d: '0.024s',
    b: '0.66s',
    c: '#F59E0B',
  },
  {
    name: 'Documentos',
    image: '/imagens/zhh8217hwlfz5mfz-app-docs2.webp',
    x: '225px',
    y: '-175px',
    xm: '0px',
    ym: '-190px',
    r: '9deg',
    d: '0.036s',
    b: '0.99s',
    c: '#EC4899',
  },
  {
    name: 'Formulários',
    image: '/imagens/o8q695qgnbd7nwkn-app-forms2.webp',
    x: '400px',
    y: '-160px',
    xm: '110px',
    ym: '-165px',
    r: '-6deg',
    d: '0.048s',
    b: '1.32s',
    c: '#06B6D4',
  },
  {
    name: 'WhatsApp',
    image: '/imagens/9d7p241awbgvb7re-app-whatsapp.webp',
    x: '-100px',
    y: '115px',
    xm: '-42px',
    ym: '82px',
    r: '5deg',
    d: '0.06s',
    b: '0s',
    c: '#F97316',
  },
  {
    name: 'PDF',
    image: '/imagens/nmsz12zpyl74vk03-app-pdf3.webp',
    x: '100px',
    y: '115px',
    xm: '42px',
    ym: '82px',
    r: '-10deg',
    d: '0.072s',
    b: '0.33s',
    c: '#6366F1',
  },
  {
    name: 'Armazenamento',
    image: '/imagens/6bde61r7cu3w527v-app-armazenamento4.webp',
    x: '250px',
    y: '25px',
    xm: '135px',
    ym: '65px',
    r: '7deg',
    d: '0.084s',
    b: '0.66s',
    c: '#14B8A6',
  },
  {
    name: 'Agenda',
    image: '/imagens/qo5ue069mppc4rgt-app-agenda3.webp',
    x: '455px',
    y: '-15px',
    xm: '135px',
    ym: '-35px',
    r: '-5deg',
    d: '0.096s',
    b: '0.99s',
    c: '#A855F7',
  },
  {
    name: 'Caderninho',
    image: '/imagens/6scnel96npn630d8-app-caderno.webp',
    x: '-320px',
    y: '185px',
    xm: '-95px',
    ym: '182px',
    r: '8deg',
    d: '0.108s',
    b: '1.32s',
    c: '#EAB308',
  },
  {
    name: 'App do banco',
    image: '/imagens/h1crbe07zt05kb2s-app-banco.webp',
    x: '-440px',
    y: '20px',
    xm: '-135px',
    ym: '-35px',
    r: '-6deg',
    d: '0.12s',
    b: '0s',
    c: '#3B82F6',
  },
  {
    name: 'Banco',
    image: '/imagens/xbehgp2vipgqf38p-app-banco2.webp',
    x: '-250px',
    y: '30px',
    xm: '-135px',
    ym: '65px',
    r: '7deg',
    d: '0.132s',
    b: '0.33s',
    c: '#FF6200',
  },
  {
    name: 'E-mail',
    image: '/imagens/dgdhaw6zcmpic5qa-app-email.webp',
    x: '260px',
    y: '185px',
    xm: '95px',
    ym: '182px',
    r: '4deg',
    d: '0.144s',
    b: '0.66s',
    c: '#F43F5E',
  },
  {
    name: 'Mercado Pago',
    image: '/imagens/428b6gfim5irqc1g-app-mercado-pago.webp',
    x: '400px',
    y: '145px',
    xm: '0px',
    ym: '182px',
    r: '-3deg',
    d: '0.156s',
    b: '0.99s',
    c: '#00B1EA',
  },
];

export function Apps() {
  return (
    <section className="apps" id="recursos">
      <div className="topo" id="apps">
        <span className="selo">Um app no lugar de quatorze</span>
        <h2>
          Aluno em <span className="realce">planilha</span>?
        </h2>
        <p>
          Planilha para cobrança, Forms para as perguntas, PDF para o treino, WhatsApp todo
          bagunçado e agenda no caderninho. A MetaFit junta tudo isso em um lugar só.
        </p>
      </div>

      <div className="palco" aria-hidden="true">
        <span className="brilho" />

        {FLOATING_APPS.map((item) => (
          <div
            key={item.name}
            className="app"
            style={
              {
                '--x': item.x,
                '--y': item.y,
                '--xm': item.xm,
                '--ym': item.ym,
                '--r': item.r,
                '--d': item.d,
                '--b': item.b,
                '--c': item.c,
              } as React.CSSProperties
            }
          >
            <span className={item.isSvgDoc ? 'bloco' : 'cheio bloco'}>
              {item.isSvgDoc ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h8l4 4v14H6z" />
                  <path d="M14 3v4h4M9 11h6M9 14h6M9 17h4" />
                </svg>
              ) : (
                <img
                  src={item.image}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </span>
            <span className="nome">{item.name}</span>
          </div>
        ))}

        <div className="contador">
          <strong>Bagunça</strong>
        </div>

        <div className="centro">
          <img
            src="/images/logo.svg"
            alt=""
            width={168}
            height={49}
            loading="lazy"
            decoding="async"
          />
          <span className="legenda">Tudo num app só</span>
        </div>
      </div>

      <p className="conta">
        <s>14 apps abertos</s>
        <IconArrowRight />
        <strong>1 MetaFit</strong>
      </p>
    </section>
  );
}
