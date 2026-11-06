import { Text, View } from 'react-native';

/** "Clubesolar" wordmark used by the visitor home header. */
export function VisitorWordmark() {
  return (
    <View className="flex-row items-center gap-1.5" accessibilityRole="header" accessibilityLabel="Clube Solar">
      <View className="h-7 w-7 items-center justify-center rounded-lg bg-solar-gold">
        <Text className="-mt-0.5 text-xl font-black leading-none text-solar-navy">+</Text>
      </View>
      <Text className="text-2xl font-extrabold tracking-tight text-white">
        Clube<Text className="text-solar-gold">solar</Text>
      </Text>
    </View>
  );
}

/** "LOJAS SOLAR / Clube Solar" lockup used by the logged-in header and drawer. */
export function StoreLockup({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const title = tone === 'light' ? 'text-white' : 'text-solar-navy';
  return (
    <View accessibilityRole="header" accessibilityLabel="Lojas Solar Clube Solar">
      <Text className="text-[10px] font-extrabold uppercase tracking-widest text-solar-gold">Lojas Solar</Text>
      <Text className={`-mt-0.5 text-lg font-extrabold tracking-tight ${title}`}>Clube Solar</Text>
    </View>
  );
}
