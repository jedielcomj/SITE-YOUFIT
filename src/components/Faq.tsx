import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IconPlus } from './Icons';

interface FaqItem {
  pergunta: string;
  resposta: string;
}

const QUESTIONS: FaqItem[] = [
  {
    pergunta: 'A MetaFit cobra taxa ou porcentagem sobre os meus alunos?',
    resposta:
      'Não. Você paga só a mensalidade do seu plano, a partir de R$ 67/mês, sem taxa por aluno e sem ficar com uma parte do que você fatura. A única taxa a mais é a do MetaFit Pay, e ela só existe se você escolher receber dos alunos por ele: cada pagamento tem uma taxa de processamento, como em qualquer maquininha, e o restante cai no seu saldo. Se preferir receber por fora (Pix direto, transferência ou outra plataforma), é só registrar o pagamento no painel e a MetaFit não fica com nada.',
  },
  {
    pergunta: 'Como faço para trazer meus alunos para a MetaFit?',
    resposta:
      'Você não precisa fazer nada. A nossa equipe faz a migração dos seus alunos para você, de forma rápida e sem dor de cabeça, e você já começa com tudo pronto na MetaFit.',
  },
  {
    pergunta: 'Dá para colocar minha equipe na mesma conta?',
    resposta:
      'Dá. No plano Elite você cadastra colaboradores e todo mundo trabalha na mesma operação, sem precisar dividir login. E você acompanha a produtividade de cada funcionário num painel próprio para isso.',
  },
  {
    pergunta: 'O que é o MetaFit?',
    resposta:
      'O MetaFit é a plataforma de gestão de consultoria fitness focada em fazer você faturar mais todos os meses. Prescrição de treinos e dietas, acompanhamento de alunos, cobrança automática e controle financeiro, tudo em um lugar só.',
  },
  {
    pergunta: 'O que é o app com marca própria?',
    resposta:
      'É um add-on disponível para qualquer plano que coloca o seu nome e a sua logo no app dos seus alunos, disponível na App Store e no Google Play. Se tiver interesse em ser parceiro, entre em contato com a gente.',
  },
  {
    pergunta: 'É difícil de configurar?',
    resposta:
      'Não. O MetaFit foi construído para ser simples: você consegue ter sua operação rodando em poucas horas. Se precisar de ajuda, nosso suporte está disponível por chat, e-mail e WhatsApp.',
  },
  {
    pergunta: 'Meus dados e os dos meus clientes estão seguros?',
    resposta:
      'Sim. Todos os dados são armazenados com criptografia e seguindo os mais altos padrões de segurança do mercado. Sua informação é sua: ninguém além de você tem acesso a ela.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="faq" id="faq">
      <div className="cabecalho">
        <span className="selo">Dúvidas</span>
        <h2>
          Perguntas <span className="realce">frequentes</span>
        </h2>
        <p>Tudo que você precisa saber antes de começar.</p>
      </div>

      <ul className="lista">
        {QUESTIONS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <li key={item.pergunta} className={`cartao${isOpen ? ' aberto' : ''}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(idx)}
              >
                <span>{item.pergunta}</span>
                <IconPlus />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {item.resposta}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
