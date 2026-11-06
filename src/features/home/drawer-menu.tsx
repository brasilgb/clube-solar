import { Pressable, Text, View } from 'react-native';
import { DrawerContentScrollView, type DrawerContentComponentProps } from 'expo-router/drawer';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { palette } from './palette';
import { APP_VERSION, CLIENT, MENU_SECTIONS, type MenuItem } from './data';
import { formatBRL, greetingFor } from './format';
import { StoreLockup } from './brand';

export type DrawerVariant = 'visitor' | 'client';

type Props = DrawerContentComponentProps & { variant: DrawerVariant };

const BADGE_STYLES = {
  amber: 'bg-solar-gold/20 text-amber-800',
  green: 'bg-green-100 text-green-700',
} as const;

const DOT_STYLES = {
  red: 'bg-red-600',
  green: 'bg-green-600',
} as const;

export function DrawerMenu({ navigation, variant }: Props) {
  const insets = useSafeAreaInsets();
  const isClient = variant === 'client';

  function handleItem(item: MenuItem) {
    if (item.home) {
      navigation.navigate(isClient ? 'home' : 'index');
      navigation.closeDrawer();
      return;
    }
    if (item.requiresLogin && !isClient) {
      navigation.closeDrawer();
      router.push('/login');
    }
  }

  function handleFooterAction() {
    navigation.closeDrawer();
    if (isClient) {
      // Signing out returns to the visitor home, the app's first screen.
      router.replace('/');
    } else {
      router.push('/login');
    }
  }

  return (
    <View className="flex-1 bg-solar-background" style={{ paddingTop: insets.top }}>
      <View className="bg-solar-blue px-5 pb-5 pt-4">
        <View className="flex-row items-center justify-between border-b border-white/15 pb-4">
          <StoreLockup />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar menu"
            onPress={() => navigation.closeDrawer()}
            className="h-11 w-11 items-center justify-center rounded-full active:bg-white/10">
            <Icon name="close" color={palette.white} />
          </Pressable>
        </View>

        {isClient ? <ClientProfile /> : <VisitorIntro />}
      </View>

      <DrawerContentScrollView contentContainerStyle={{ paddingBottom: 16 }} className="flex-1">
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} className="mt-4">
            <Text className="px-6 pb-1 text-[11px] font-bold uppercase tracking-wider text-solar-muted">
              {section.title}
            </Text>
            {section.items.map((item) => {
              const active = item.home === true;
              const locked = item.requiresLogin === true && !isClient;
              const actionable = active || locked;
              return (
                <Pressable
                  key={item.label}
                  accessibilityRole="menuitem"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: active, disabled: !actionable }}
                  disabled={!actionable}
                  onPress={() => handleItem(item)}
                  className={`mx-3 min-h-12 flex-row items-center gap-3 rounded-xl px-3 active:bg-solar-pale ${
                    active ? 'bg-solar-blue' : ''
                  } ${actionable ? '' : 'opacity-60'}`}>
                  <Icon name={item.icon} size={22} color={active ? palette.white : palette.muted} />
                  <Text
                    className={`flex-1 text-[15px] font-semibold ${active ? 'text-white' : 'text-solar-navy'}`}
                    numberOfLines={1}>
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View className={`rounded-full px-2 py-0.5 ${BADGE_STYLES[item.badge.tone]}`}>
                      <Text className="text-[11px] font-bold">{item.badge.text}</Text>
                    </View>
                  )}
                  {item.dot && <View className={`h-2 w-2 rounded-full ${DOT_STYLES[item.dot]}`} />}
                  {item.trailing && <Text className="text-xs text-solar-muted">{item.trailing}</Text>}
                  {locked && <Icon name="lock" size={16} color={palette.muted} />}
                  {!locked && item.chevron && <Icon name="chevron" size={18} color={palette.muted} />}
                </Pressable>
              );
            })}
          </View>
        ))}
      </DrawerContentScrollView>

      <View className="border-t border-solar-line bg-solar-surface px-4 pt-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <View className="flex-row justify-between px-2 pb-3">
          <Text className="text-xs font-semibold text-solar-blue">Termos de Uso</Text>
          <Text className="text-xs font-semibold text-solar-blue">Políticas de Troca</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={handleFooterAction}
          className={`h-12 flex-row items-center justify-center gap-2 rounded-xl active:opacity-80 ${
            isClient ? 'bg-red-50' : 'bg-solar-blue'
          }`}>
          <Icon name={isClient ? 'logout' : 'personCircle'} size={20} color={isClient ? palette.red : palette.white} />
          <Text className={`text-sm font-bold ${isClient ? 'text-solar-red' : 'text-white'}`}>
            {isClient ? 'Sair da Conta' : 'Entrar'}
          </Text>
        </Pressable>
        <Text className="pt-3 text-center text-[11px] text-solar-muted">
          Versão {APP_VERSION} • Lojas Solar S/A
        </Text>
      </View>
    </View>
  );
}

function VisitorIntro() {
  return (
    <View className="mt-4 flex-row items-center">
      <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-solar-gold bg-white">
        <Icon name="person" size={30} color={palette.blue} />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-sm text-white/85">Faça login e aproveite as vantagens do</Text>
        <Text className="text-lg font-bold text-white">Aplicativo das Lojas Solar</Text>
      </View>
    </View>
  );
}

function ClientProfile() {
  const initials = CLIENT.fullName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <>
      <View className="mt-4 flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-solar-gold bg-white">
          <Text className="text-lg font-extrabold text-solar-blue">{initials}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-white/80">{greetingFor(new Date())},</Text>
            <View className="rounded-md border border-solar-gold/60 px-2 py-0.5">
              <Text className="text-[11px] font-bold uppercase text-solar-gold">{CLIENT.tier}</Text>
            </View>
          </View>
          <Text className="text-base font-bold text-white" numberOfLines={1}>
            {CLIENT.fullName}
          </Text>
          <Text className="font-mono text-xs text-white/70">CPF {CLIENT.cpfMasked}</Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
        <View>
          <Text className="text-[10px] font-bold uppercase tracking-wider text-white/70">Cashback Solar</Text>
          <Text className="text-lg font-extrabold text-white">{formatBRL(CLIENT.cashbackCents)}</Text>
        </View>
        <Pressable accessibilityRole="button" className="rounded-full bg-solar-gold px-3 py-1.5 active:opacity-80">
          <Text className="text-xs font-bold text-solar-navy">Ver extrato</Text>
        </Pressable>
      </View>
    </>
  );
}
