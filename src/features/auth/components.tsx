import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export function AuthShell({ step, children }: { step: 1 | 2; children: ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-solar-background" edges={['top', 'bottom']}>
      <View className="border-b border-solar-line bg-solar-background px-4 py-2">
        <View className="mx-auto w-full max-w-xl flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {step === 2 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Voltar para o CPF"
                onPress={() => router.replace('/login')}
                className="h-11 w-11 items-center justify-center rounded-full active:bg-solar-pale">
                <Text className="text-3xl text-solar-navy">‹</Text>
              </Pressable>
            )}
            <View>
              <Text className="text-lg font-extrabold tracking-tight text-solar-blue">lojas solar</Text>
              <Text className="-mt-1 text-[10px] font-bold uppercase tracking-widest text-solar-orange">Clube Solar</Text>
            </View>
          </View>
          <View className="rounded-full bg-solar-pale px-3 py-1.5">
            <Text className="text-xs font-bold text-solar-blue">Etapa {step} de 2</Text>
          </View>
        </View>
      </View>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled">
        <View className="mx-auto w-full max-w-xl gap-5 px-4 pb-8 pt-5">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function AuthCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-2xl border border-solar-line bg-solar-surface p-4 ${className}`}>{children}</View>;
}

export function PrimaryButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`h-14 flex-row items-center justify-center gap-2 rounded-xl bg-solar-orange active:opacity-80 ${disabled ? 'opacity-50' : ''}`}>
      <Text className="text-base font-bold text-white">{label}</Text>
      <Text className="text-xl font-bold text-white">→</Text>
    </Pressable>
  );
}

export function TextAction({ label, onPress, className = '' }: { label: string; onPress: () => void; className?: string }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} className={`min-h-11 justify-center ${className}`}>
      <Text className="text-sm font-semibold text-solar-blue">{label}</Text>
    </Pressable>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-solar-line" />
      <Text className="text-xs font-semibold uppercase tracking-wider text-solar-muted">{label}</Text>
      <View className="h-px flex-1 bg-solar-line" />
    </View>
  );
}

export function StatusMessage({ message, error = false }: { message: string; error?: boolean }) {
  return (
    <View accessibilityRole="alert" className={`rounded-xl px-3 py-3 ${error ? 'bg-red-50' : 'bg-solar-pale'}`}>
      <Text className={`text-sm ${error ? 'text-solar-red' : 'text-solar-blue'}`}>{message}</Text>
    </View>
  );
}

export function TrustFooter() {
  return (
    <View className="items-center gap-1 py-2">
      <Text className="text-center text-xs font-semibold text-solar-muted">Lojas Solar • confiança gaúcha</Text>
      <Text className="text-center text-xs text-solar-muted">Seus dados são tratados conforme a LGPD.</Text>
    </View>
  );
}
