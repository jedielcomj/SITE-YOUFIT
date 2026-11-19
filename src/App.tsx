/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Apps } from './components/Apps';
import { Cartas } from './components/Cartas';
import { Depoimentos } from './components/Depoimentos';
import { Faq } from './components/Faq';
import { Final } from './components/Final';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Kanban } from './components/Kanban';
import { Pay } from './components/Pay';
import { Perdas } from './components/Perdas';
import { Planos } from './components/Planos';
import { Whats } from './components/Whats';

export default function App() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  return (
    <div className="pagina">
      <Header search={search} />
      <main>
        <Hero search={search} />
        <Apps />
        <Cartas />
        <Pay />
        <Kanban />
        <Whats />
        <Perdas search={search} />
        <Depoimentos search={search} />
        <Planos search={search} />
        <Faq />
        <Final search={search} />
      </main>
      <Footer search={search} />
    </div>
  );
}
