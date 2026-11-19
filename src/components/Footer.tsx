import React from 'react';
import {
  appendUtmParams,
  INSTAGRAM_URL,
  LOGIN_URL,
  TIKTOK_URL,
  TRIAL_CHECKOUT_URL,
  WHATSAPP_URL,
} from '../utils/utm';
import { IconInstagram, IconTikTok } from './Icons';

interface FooterProps {
  search: string;
}

export function Footer({ search }: FooterProps) {
  const checkoutUrl = appendUtmParams(TRIAL_CHECKOUT_URL, search);

  return (
    <footer className="rodape">
      <div className="conteudo">
        <div className="marca">
          <img src="/images/logo.svg" alt="MetaFit" width={103} height={30} loading="lazy" />
          <p>
            Treinos, dietas, gestão de alunos, cobrança automática e controle financeiro em um só
            lugar.
          </p>
          <div className="redes">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da MetaFit"
            >
              <IconInstagram />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok da MetaFit"
            >
              <IconTikTok />
            </a>
          </div>
        </div>

        <nav className="coluna" aria-label="Menu do rodapé">
          <span className="titulo">Menu</span>
          <a href="#recursos">Recursos</a>
          <a href="#app">O app</a>
          <a href="#planos">Planos</a>
          <a href="#faq">Dúvidas</a>
        </nav>

        <div className="coluna">
          <span className="titulo">Acesso</span>
          <a href={LOGIN_URL}>Entrar na plataforma</a>
          <a href={checkoutUrl}>Testar grátis por 10 dias</a>
        </div>

        <div className="coluna">
          <span className="titulo">Fale conosco</span>
          <a href="mailto:contato@metafit.cc">contato@metafit.cc</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp: +55 12 98176-1453
          </a>
          <div className="empresa">
            <span>METAFIT NUTRIÇÃO E EDUCAÇÃO FÍSICA LTDA</span>
            <span>CNPJ: 39.695.851/0001-31</span>
            <span>São José dos Campos, São Paulo</span>
          </div>
        </div>
      </div>

      <div className="base">
        <span>© 2026 MetaFit. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
