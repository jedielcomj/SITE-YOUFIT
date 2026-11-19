import React from 'react';
import { appendUtmParams, TRIAL_CHECKOUT_URL, WHATSAPP_URL } from '../utils/utm';
import { IconBolt, IconCheck } from './Icons';

interface FinalProps {
  search: string;
}

const GUARANTEES = ['10 dias grátis', 'Sem fidelidade', 'Cancele pelo painel'];

export function Final({ search }: FinalProps) {
  const checkoutUrl = appendUtmParams(TRIAL_CHECKOUT_URL, search);

  return (
    <section className="final" id="final">
      <div className="caixa">
        <span className="brilho" aria-hidden="true" />
        <span className="marca" aria-hidden="true">
          <IconBolt />
        </span>
        <span className="selo">Bora?</span>
        <h2>
          Coloque sua consultoria no <span className="realce">automático</span>
        </h2>
        <p>
          Teste por 10 dias com todas as ferramentas desbloqueadas. Sem fidelidade e sem multa:
          você cancela quando quiser, direto pelo painel.
        </p>
        <div className="acoes">
          <a className="botao" href={checkoutUrl}>
            Testar grátis por 10 dias
          </a>
          <a className="botao vidro" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </div>
        <ul className="garantias">
          {GUARANTEES.map((g) => (
            <li key={g}>
              <IconCheck />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
