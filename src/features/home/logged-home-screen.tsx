import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import type { DrawerNavigationProp } from 'expo-router/drawer';

import { StoreLockup } from './brand';
import { BottomNav, type BottomNavItem } from './bottom-nav';
import { CLIENT, FAVORITE_STORE, LAST_ORDER, OFFERS, type Offer } from './data';
import { formatBRL, formatDayMonth, formatFullDate, greetingFor, hasPassed } from './format';
import { Icon, type IconName } from './icon';
import { palette } from './palette';

const BOTTOM_NAV: BottomNavItem[] = [
  { label: 'Início', icon: 'home', active: true },
  { label: 'Categorias', icon: 'grid' },
  { label: 'Ofertas', icon: 'tag' },
  { label: 'Carrinho', icon: 'cart' },
  { label: 'Conta', icon: 'personCircle' },
];

const QUICK_ACCESS: { label: string; icon: IconName }[] = [
  { label: 'Comprar & Catálogo', icon: 'store' },
  { label: 'Carnê & Faturas', icon: 'receipt' },
  { label: 'Cashback Solar', icon: 'cash' },
  { label: 'Assinar Contratos', icon: 'pencil' },
  { label: 'Garantia & Reparos', icon: 'wrench' },
  { label: 'Nossas Filiais', icon: 'pin' },
];

export function LoggedHomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<Record<string, object | undefined>>>();
  const warrantyExpired = hasPassed(LAST_ORDER.warrantyEndsAt);
  const progress = CLIENT.installmentsPaid / CLIENT.installmentsTotal;

  return (
    <SafeAreaView className="flex-1 bg-solar-background" edges={['top']}>
      <View className="flex-row items-center justify-between border-b border-solar-line bg-solar-blue px-4 py-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
          onPress={() => navigation.openDrawer()}
          className="h-11 w-11 items-center justify-center rounded-full active:bg-white/10">
          <Icon name="menu" color={palette.white} />
        </Pressable>
        <StoreLockup />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notificações"
          className="h-11 w-11 items-center justify-center rounded-full active:bg-white/10">
          <Icon name="bell" color={palette.white} />
          <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border border-solar-blue bg-red-500" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <View className="mx-auto w-full max-w-xl gap-5 px-4 pt-5">
          <View>
            <Text className="text-sm text-solar-muted">{greetingFor(new Date())}, seja bem-vindo de volta</Text>
            <Text className="text-2xl font-extrabold tracking-tight text-solar-navy" numberOfLines={2}>
              {CLIENT.fullName}
            </Text>
            <View className="mt-2 flex-row items-center gap-2">
              <View className="flex-row items-center gap-1 rounded-full border border-solar-gold bg-solar-gold/15 px-2.5 py-1">
                <Icon name="star" size={14} color={palette.orange} />
                <Text className="text-[11px] font-extrabold uppercase text-solar-orange">Cliente {CLIENT.tier} Solar</Text>
              </View>
              <Text className="text-xs text-solar-muted">Desde {CLIENT.memberSince}</Text>
            </View>
          </View>

          <View className="rounded-3xl bg-solar-blue p-5">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-wider text-white/80">Saldo Cashback Solar</Text>
                <Text className="text-3xl font-extrabold text-white">{formatBRL(CLIENT.cashbackCents)}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                className="flex-row items-center gap-1.5 rounded-xl bg-solar-orange px-3 py-2.5 active:opacity-80">
                <Icon name="qr" size={18} color={palette.white} />
                <Text className="text-xs font-bold text-white">Usar no Caixa</Text>
              </Pressable>
            </View>

            <View className="mt-4 rounded-2xl bg-white/10 p-4">
              <View className="flex-row items-center justify-between gap-2">
                <View className="flex-row items-center gap-2">
                  <Icon name="doc" size={18} color={palette.white} />
                  <Text className="text-sm font-semibold text-white">Carnê & Crediário Digital</Text>
                </View>
                <View className="rounded-full bg-solar-gold px-2.5 py-1">
                  <Text className="text-[11px] font-bold text-solar-navy">
                    {CLIENT.openInstallmentsThisMonth} parcelas neste mês
                  </Text>
                </View>
              </View>
              <View className="mt-3 flex-row items-end justify-between gap-2">
                <View>
                  <Text className="text-xs text-white/75">Próximo vencimento: {formatDayMonth(CLIENT.nextDueDate)}</Text>
                  <Text className="text-xl font-extrabold text-white">{formatBRL(CLIENT.nextAmountCents)}</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  className="flex-row items-center gap-1.5 rounded-xl bg-white px-3 py-2.5 active:opacity-80">
                  <Icon name="qr" size={18} color={palette.blue} />
                  <Text className="text-xs font-bold text-solar-blue">Pagar com Pix</Text>
                </Pressable>
              </View>
            </View>

            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-xs text-white/85">
                Limite pré-aprovado: <Text className="font-bold text-white">{formatBRL(CLIENT.creditLimitCents)}</Text>
              </Text>
              <Pressable accessibilityRole="button" className="flex-row items-center gap-1 active:opacity-70">
                <Text className="text-xs font-bold text-white">Ver extrato completo</Text>
                <Icon name="chevron" size={16} color={palette.white} />
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center justify-between rounded-2xl border border-solar-line bg-solar-surface p-4">
            <View className="flex-1 pr-3">
              <Text className="text-[11px] font-extrabold uppercase text-solar-orange">Exclusivo Clube Ouro</Text>
              <Text className="text-lg font-extrabold text-solar-navy">Esquenta Black Solar: até 40% OFF</Text>
              <Text className="text-xs text-solar-muted">Smart TVs, estofados e eletros com frete grátis</Text>
            </View>
            <Pressable accessibilityRole="button" className="rounded-xl bg-solar-orange px-4 py-3 active:opacity-80">
              <Text className="text-sm font-bold text-white">Aproveitar</Text>
            </Pressable>
          </View>

          <View className="gap-3">
            <Text className="text-lg font-bold text-solar-navy">Acesso Rápido</Text>
            <View className="flex-row flex-wrap gap-3">
              {QUICK_ACCESS.map((item) => (
                <Pressable
                  key={item.label}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  className="w-[31%] items-center gap-2 rounded-2xl border border-solar-line bg-solar-surface p-3 active:bg-solar-pale">
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-solar-pale">
                    <Icon name={item.icon} size={24} color={palette.blue} />
                  </View>
                  <Text className="text-center text-xs font-semibold text-solar-navy">{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="gap-3 rounded-2xl border border-solar-line bg-solar-surface p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Icon name="heart" size={18} color={palette.orange} />
                <Text className="text-base font-bold text-solar-navy">Sua Loja Solar Favorita</Text>
              </View>
              <Pressable accessibilityRole="button" className="min-h-11 justify-center">
                <Text className="text-xs font-bold text-solar-orange">Trocar loja</Text>
              </Pressable>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <View className="flex-1">
                <Text className="text-base font-bold text-solar-navy">{FAVORITE_STORE.name}</Text>
                <Text className="text-xs text-solar-muted">{FAVORITE_STORE.address}</Text>
              </View>
              {FAVORITE_STORE.isMatrix && (
                <View className="rounded-full bg-solar-pale px-2.5 py-1">
                  <Text className="text-[11px] font-bold text-solar-blue">Matriz próxima</Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full bg-green-600" />
              <Text className="text-xs font-semibold text-green-700">Aberta hoje até {FAVORITE_STORE.openUntil}</Text>
              <Text className="text-xs text-solar-muted">• a {FAVORITE_STORE.distanceKm.toFixed(1).replace('.', ',')} km de você</Text>
            </View>
            <View className="flex-row gap-3">
              <Pressable
                accessibilityRole="button"
                className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-solar-line active:bg-solar-pale">
                <Icon name="chat" size={18} color={palette.blue} />
                <Text className="text-sm font-bold text-solar-blue">WhatsApp</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-solar-blue active:opacity-80">
                <Icon name="directions" size={18} color={palette.white} />
                <Text className="text-sm font-bold text-white">Como chegar</Text>
              </Pressable>
            </View>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-solar-navy">Última Compra & Garantia</Text>
              <Pressable accessibilityRole="button" className="min-h-11 justify-center">
                <Text className="text-xs font-bold text-solar-orange">Ver todos pedidos</Text>
              </Pressable>
            </View>
            <View className="gap-4 rounded-2xl border border-solar-line bg-solar-surface p-4">
              <View className="flex-row gap-3">
                <View className="h-20 w-20 items-center justify-center rounded-xl bg-solar-pale">
                  <Icon name="box" size={32} color={palette.blue} />
                </View>
                <View className="flex-1 gap-1">
                  <View className="flex-row items-center gap-1">
                    <Icon name="check" size={16} color={palette.green} />
                    <Text className="text-xs font-semibold text-green-700">Entregue em {formatFullDate(LAST_ORDER.deliveredAt)}</Text>
                  </View>
                  <Text className="text-base font-bold text-solar-navy" numberOfLines={2}>
                    {LAST_ORDER.product}
                  </Text>
                  <Text className="text-xs text-solar-muted">Pedido #{LAST_ORDER.code}</Text>
                  <View className={`mt-1 self-start rounded-md px-2 py-1 ${warrantyExpired ? 'bg-red-50' : 'bg-green-50'}`}>
                    <Text className={`text-[11px] font-bold ${warrantyExpired ? 'text-solar-red' : 'text-green-700'}`}>
                      {warrantyExpired ? 'Garantia vencida em' : 'Garantia ativa até'} {formatFullDate(LAST_ORDER.warrantyEndsAt)}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-xs text-solar-muted">Parcelas quitadas no carnê</Text>
                  <Text className="text-xs font-bold text-solar-navy">
                    {CLIENT.installmentsPaid} de {CLIENT.installmentsTotal} pagas
                  </Text>
                </View>
                <View className="h-2 overflow-hidden rounded-full bg-solar-pale">
                  <View className="h-2 rounded-full bg-solar-orange" style={{ width: `${progress * 100}%` }} />
                </View>
              </View>

              <View className="flex-row justify-between">
                <Pressable accessibilityRole="button" className="min-h-11 flex-row items-center gap-2 active:opacity-70">
                  <Icon name="verified" size={18} color={palette.blue} />
                  <Text className="text-sm font-bold text-solar-blue">Certificado de garantia</Text>
                </Pressable>
                <Pressable accessibilityRole="button" className="min-h-11 flex-row items-center gap-1 active:opacity-70">
                  <Text className="text-sm font-bold text-solar-orange">Segunda via NF-e</Text>
                  <Icon name="download" size={16} color={palette.orange} />
                </Pressable>
              </View>
            </View>
          </View>

          <View className="gap-3">
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-bold text-solar-navy">Ofertas que combinam com você</Text>
                <Icon name="sparkles" size={18} color={palette.gold} />
              </View>
              <Text className="text-xs text-solar-muted">Baseado na sua última compra</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3">
              {OFFERS.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </ScrollView>
          </View>

          <View className="flex-row items-center gap-3 rounded-2xl border border-solar-line bg-solar-surface p-4">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-solar-pale">
              <Icon name="support" size={24} color={palette.blue} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-solar-navy">Precisa de ajuda com seu carnê?</Text>
              <Text className="text-xs text-solar-muted">Nosso time da {FAVORITE_STORE.name} está online</Text>
            </View>
            <Pressable accessibilityRole="button" className="rounded-xl bg-solar-blue px-4 py-3 active:opacity-80">
              <Text className="text-sm font-bold text-white">Atendimento</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <BottomNav items={BOTTOM_NAV} />
    </SafeAreaView>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <View className="w-52 gap-2 rounded-2xl border border-solar-line bg-solar-surface p-3">
      <View className="h-32 items-center justify-center rounded-xl bg-solar-pale">
        <Icon name="box" size={40} color={palette.blue} />
        {offer.discountPercent !== undefined && (
          <View className="absolute left-2 top-2 rounded-full bg-solar-red px-2 py-0.5">
            <Text className="text-[11px] font-bold text-white">-{offer.discountPercent}%</Text>
          </View>
        )}
        {offer.cashbackCents !== undefined && (
          <View className="absolute right-2 top-2 rounded-full bg-solar-gold px-2 py-0.5">
            <Text className="text-[11px] font-bold text-solar-navy">+ {formatBRL(offer.cashbackCents)} cashback</Text>
          </View>
        )}
      </View>
      <Text className="text-[11px] font-semibold uppercase text-solar-muted">{offer.category}</Text>
      <Text className="text-sm font-bold text-solar-navy" numberOfLines={2}>
        {offer.title}
      </Text>
      {offer.oldPriceCents !== undefined && (
        <Text className="text-xs text-solar-muted line-through">{formatBRL(offer.oldPriceCents)}</Text>
      )}
      <Text className="text-lg font-extrabold text-solar-navy">
        {formatBRL(offer.cashPriceCents ?? offer.priceCents)} <Text className="text-xs font-semibold text-solar-muted">à vista</Text>
      </Text>
      {offer.installmentLabel && <Text className="text-xs text-solar-muted">{offer.installmentLabel}</Text>}
      <Pressable accessibilityRole="button" className="mt-1 h-11 items-center justify-center rounded-xl bg-solar-orange active:opacity-80">
        <Text className="text-sm font-bold text-white">Comprar</Text>
      </Pressable>
    </View>
  );
}
