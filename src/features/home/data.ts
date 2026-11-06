// Sample data for the home screens. Replace with API data when the backend is connected.
// All values are fictional.

import type { IconName } from './icon';

export const CLIENT = {
  fullName: 'Cliente Exemplo Solar',
  cpfMasked: '000.***.***-00',
  tier: 'Ouro',
  memberSince: 2018,
  cashbackCents: 7668,
  creditLimitCents: 380000,
  openInstallmentsThisMonth: 3,
  nextDueDate: '2026-11-10',
  nextAmountCents: 18450,
  installmentsPaid: 1,
  installmentsTotal: 10,
};

export const FAVORITE_STORE = {
  name: 'Filial Salvador do Sul',
  address: 'Av. Exemplo, 100 - Centro',
  openUntil: '18:30',
  distanceKm: 1.2,
  isMatrix: true,
};

export const LAST_ORDER = {
  product: 'Smart TV 55" 4K UHD',
  code: 'SOL-00000',
  deliveredAt: '2026-10-15',
  warrantyEndsAt: '2025-10-31',
};

export type Offer = {
  id: string;
  category: string;
  title: string;
  priceCents: number;
  oldPriceCents?: number;
  cashPriceCents?: number;
  installmentLabel?: string;
  discountPercent?: number;
  cashbackCents?: number;
};

export const OFFERS: Offer[] = [
  {
    id: 'soundbar',
    category: 'Áudio & Vídeo',
    title: 'Soundbar Bluetooth 300W com Subwoofer',
    oldPriceCents: 89900,
    cashPriceCents: 67425,
    priceCents: 67425,
    installmentLabel: 'ou 10x de R$ 74,90',
    discountPercent: 25,
  },
  {
    id: 'tv-support',
    category: 'Acessórios TV',
    title: 'Suporte Articulado Reforçado para TV 32-75"',
    oldPriceCents: 15990,
    cashPriceCents: 11990,
    priceCents: 11990,
    installmentLabel: 'ou 3x de R$ 39,96',
    cashbackCents: 1500,
  },
];

export type MenuItem = {
  label: string;
  icon: IconName;
  /** Opens the home screen of the current drawer variant. */
  home?: true;
  /** Needs a signed-in client; visitors are sent to the login screen. */
  requiresLogin?: true;
  badge?: { text: string; tone: 'amber' | 'green' };
  dot?: 'red' | 'green';
  trailing?: string;
  chevron?: boolean;
};

export const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Principal',
    items: [
      { label: 'Início & Ofertas', icon: 'home', home: true, dot: 'red' },
      { label: 'Minha Conta & Dados', icon: 'person', requiresLogin: true, chevron: true },
      { label: 'Crediário & Carnê Digital', icon: 'wallet', requiresLogin: true, badge: { text: '3 faturas', tone: 'amber' } },
      { label: 'Pagar Faturas (Pix / Boleto)', icon: 'qr', requiresLogin: true, badge: { text: 'Rápido', tone: 'green' } },
      { label: 'Histórico de Pedidos', icon: 'receipt', requiresLogin: true, chevron: true },
    ],
  },
  {
    title: 'Serviços & Benefícios',
    items: [
      { label: 'Clube Solar Cashback', icon: 'star', requiresLogin: true, badge: { text: 'Ativo', tone: 'green' } },
      { label: 'Garantia & Assistência', icon: 'wrench', requiresLogin: true, chevron: true },
      { label: 'Assinar Documentos', icon: 'pencil', requiresLogin: true, dot: 'red' },
      { label: 'Nossas Lojas', icon: 'store', trailing: 'Salvador do Sul', chevron: true },
    ],
  },
  {
    title: 'Atendimento & Suporte',
    items: [
      { label: 'Fale Conosco / WhatsApp', icon: 'chat', dot: 'green' },
      { label: 'Dúvidas Frequentes (FAQ)', icon: 'help', chevron: true },
      { label: 'Privacidade & LGPD', icon: 'shield', chevron: true },
    ],
  },
];

export const APP_VERSION = '3.4.2';
