import React from 'react';
import { appendUtmParams, LOGIN_URL, TRIAL_CHECKOUT_URL } from '../utils/utm';

interface HeaderProps {
  search: string;
}

export function Header({ search }: HeaderProps) {
  const checkoutUrl = appendUtmParams(TRIAL_CHECKOUT_URL, search);

  return (
    <header className="menu">
      <div className="barra">
        <a className="marca" href="#topo" aria-label="MetaFit, voltar ao topo">
          <img src="/images/logo.svg" alt="MetaFit" width={95} height={28} />
        </a>
        <nav className="links" aria-label="Seções da página">
          <a href="#recursos">Recursos</a>
          <a href="#app">O app</a>
          <a href="#planos">Planos</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div className="acoes">
          <a className="entrar" href={LOGIN_URL}>
            Entrar
          </a>
          <a className="botao" href={checkoutUrl}>
            Teste grátis
          </a>
        </div>
      </div>
    </header>
  );
}
