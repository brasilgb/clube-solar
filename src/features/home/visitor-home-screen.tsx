import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, router } from 'expo-router';
import type { DrawerNavigationProp } from 'expo-router/drawer';

import { VisitorWordmark } from './brand';
import { BottomNav, type BottomNavItem } from './bottom-nav';
import { Icon, type IconName } from './icon';
import { palette } from './palette';

const BOTTOM_NAV: BottomNavItem[] = [
  { label: 'Início', icon: 'home', active: true },
  { label: 'Departamentos', icon: 'grid' },
  { label: 'Ofertas', icon: 'tag' },
  { label: 'Lojas', icon: 'storeFront' },
  { label: 'Entrar', icon: 'personCircle', onPress: () => router.push('/login') },
];

const SERVICES: { label: string; icon: IconName }[] = [
  { label: 'Comprar', icon: 'bag' },
  { label: 'Assinar Doc', icon: 'pencil' },
  { label: 'Pagamentos', icon: 'wallet' },
  { label: 'Cashback', icon: 'cash' },
];

export function VisitorHomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<Record<string, object | undefined>>>();

  return (
    <SafeAreaView className="flex-1 bg-solar-background" edges={['top']}>
      <View className="flex-row items-center justify-between bg-[#0084D6] px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir menu"
            onPress={() => navigation.openDrawer()}
            className="h-11 w-11 items-center justify-center rounded-full active:bg-white/10">
            <Icon name="menu" color={palette.white} />
          </Pressable>
          <VisitorWordmark />
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/login')}
          className="flex-row items-center gap-2 rounded-full bg-solar-blue px-4 py-2.5 active:opacity-80">
          <Text className="text-sm font-bold text-white">Entrar</Text>
          <Icon name="personCircle" size={18} color={palette.white} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <View className="mx-auto w-full max-w-xl gap-5 px-4 pt-4">
          <View className="gap-3 rounded-2xl border border-solar-line bg-solar-surface p-4">
            <View className="flex-row items-center justify-between">
              <View className="rounded-full bg-solar-pale px-3 py-1">
                <Text className="text-xs font-bold uppercase tracking-wider text-solar-blue">Modo visitante</Text>
              </View>
              <Text className="text-xs text-solar-muted">Ambiente de demonstração</Text>
            </View>
            <Text className="text-xl font-extrabold text-solar-navy">Olá, bem-vindo(a) à Lojas Solar!</Text>
            <Text className="text-sm leading-5 text-solar-muted">
              Acesse sua conta para consultar carnês, faturas, limites e saldo do seu cashback Solar com facilidade.
            </Text>
            <View className="flex-row gap-3 pt-1">
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/login')}
                className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-solar-blue active:opacity-80">
                <Icon name="personCircle" size={18} color={palette.white} />
                <Text className="text-sm font-bold text-white">Acessar conta</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border-[1.5px] border-solar-blue active:bg-solar-pale">
                <Icon name="person" size={18} color={palette.blue} />
                <Text className="text-sm font-bold text-solar-blue">Criar cadastro</Text>
              </Pressable>
            </View>
          </View>

          <View className="items-center gap-3 rounded-3xl bg-[#002B5C] px-5 py-7">
            <Text className="text-xs font-bold uppercase tracking-[3px] text-solar-gold">{'// Esquenta //'}</Text>
            <Text className="text-4xl font-black italic leading-10 text-white">BLACK</Text>
            <Text className="-mt-3 text-5xl font-black italic leading-[52px] text-solar-gold">SOLAR</Text>
            <View className="rounded-full border border-white/30 px-4 py-1">
              <Text className="text-[11px] font-bold uppercase tracking-widest text-white">A invasão começou!</Text>
            </View>
            <Text className="text-sm font-semibold uppercase tracking-wide text-white/90">Ofertas de outro mundo</Text>
            <Pressable
              accessibilityRole="button"
              className="mt-2 h-12 w-full items-center justify-center rounded-xl bg-solar-gold active:opacity-80">
              <Text className="text-sm font-extrabold uppercase text-solar-navy">Conferir produtos</Text>
            </Pressable>
          </View>

          <View className="flex-row items-center gap-3 rounded-2xl border border-solar-line bg-solar-surface p-4">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <Icon name="pin" size={22} color={palette.green} />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] font-bold uppercase tracking-wider text-solar-muted">Loja mais próxima</Text>
              <Text className="text-base font-extrabold text-solar-navy">Salvador do Sul - RS</Text>
              <Text className="text-xs text-solar-muted">Venha nos visitar</Text>
            </View>
            <Pressable accessibilityRole="button" className="rounded-xl bg-solar-pale px-4 py-2.5 active:opacity-80">
              <Text className="text-sm font-bold text-solar-blue">Trocar</Text>
            </Pressable>
          </View>

          <View className="gap-3">
            <Text className="text-xs font-bold uppercase tracking-wider text-solar-muted">Serviços rápidos</Text>
            <View className="flex-row gap-2">
              {SERVICES.map((service) => (
                <Pressable
                  key={service.label}
                  accessibilityRole="button"
                  accessibilityLabel={service.label}
                  className="flex-1 items-center gap-2 rounded-2xl bg-[#0084D6] py-4 active:opacity-80">
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
                    <Icon name={service.icon} size={22} color={palette.white} />
                  </View>
                  <Text className="text-center text-xs font-bold text-white">{service.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="gap-3 rounded-3xl bg-[#002B5C] p-5">
            <View className="self-start rounded-md bg-solar-gold px-2 py-1">
              <Text className="text-[11px] font-extrabold uppercase text-solar-navy">Vantagem exclusiva</Text>
            </View>
            <Text className="text-xl font-extrabold text-white">Faça parte do Clube Solar</Text>
            <Text className="text-sm leading-5 text-white/85">
              Descontos especiais em mais de 70 lojas físicas no Rio Grande do Sul e ofertas online imbatíveis todo dia.
            </Text>
            <Pressable
              accessibilityRole="button"
              className="flex-row items-center justify-center gap-1 rounded-xl bg-solar-gold py-3 active:opacity-80">
              <Text className="text-sm font-extrabold text-solar-navy">Cadastre-se já</Text>
              <Icon name="chevron" size={16} color={palette.navy} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <BottomNav items={BOTTOM_NAV} />
    </SafeAreaView>
  );
}
