import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from './icon';
import { palette } from './palette';

export type BottomNavItem = {
  label: string;
  icon: IconName;
  active?: boolean;
  onPress?: () => void;
};

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      className="absolute bottom-0 left-0 right-0 border-t border-solar-line bg-solar-surface"
      style={{ paddingBottom: insets.bottom }}>
      <View className="mx-auto w-full max-w-xl flex-row px-2 pt-2">
        {items.map((item) => {
          const color = item.active ? palette.blue : palette.muted;
          return (
            <Pressable
              key={item.label}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: item.active, disabled: !item.onPress }}
              disabled={!item.onPress}
              onPress={item.onPress}
              className="min-h-14 flex-1 items-center justify-center gap-0.5 active:opacity-70">
              <Icon name={item.icon} size={24} color={color} />
              <Text className={`text-[11px] font-semibold ${item.active ? 'text-solar-blue' : 'text-solar-muted'}`}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
