import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { AuthCard, AuthShell, PrimaryButton, SectionDivider, StatusMessage, TextAction, TrustFooter } from './components';
import { isValidCpf, maskCpf } from './cpf';

export function PasswordLoginScreen() {
  const { cpf } = useLocalSearchParams<{ cpf?: string }>();
  const cpfValue = typeof cpf === 'string' && isValidCpf(cpf) ? cpf : '';
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const validPassword = password.length >= 6 && password.length <= 12;

  return (
    <AuthShell step={2}>
      <View className="flex-row items-center justify-between gap-2">
        <View className="rounded-full bg-white px-3 py-2">
          <Text className="text-xs font-bold uppercase tracking-wide text-solar-blue">✓ Ambiente protegido Solar</Text>
        </View>
        <Text className="text-xs text-solar-muted">Acesso seguro</Text>
      </View>

      <AuthCard>
        <View className="flex-row items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-solar-blue">
            <Text className="text-2xl font-bold text-white">S</Text>
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base font-bold text-solar-navy">Sua conta Solar</Text>
            <Text className="text-xs text-solar-muted">CPF: {maskCpf(cpfValue)}</Text>
          </View>
          <TextAction label="Trocar" onPress={() => router.replace('/login')} />
        </View>
      </AuthCard>

      <View className="gap-2">
        <Text className="text-2xl font-extrabold text-solar-navy">Digite sua senha de acesso</Text>
        <Text className="text-sm leading-6 text-solar-muted">Insira sua senha cadastrada para conferir carnês em aberto, limite disponível e condições do crediário.</Text>
      </View>

      <View className="gap-3">
        <Text className="text-sm font-semibold text-solar-navy">Sua senha cadastrada</Text>
        <View className="h-14 flex-row items-center rounded-xl border border-solar-line bg-white px-4">
          <Text className="mr-3 text-lg text-solar-blue">●</Text>
          <TextInput
            accessibilityLabel="Sua senha cadastrada"
            autoComplete="current-password"
            secureTextEntry={!showPassword}
            placeholder="Digite de 6 a 12 caracteres"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={(value) => { setPassword(value); setMessage(''); }}
            maxLength={12}
            className="h-full flex-1 text-base text-solar-navy"
          />
          <Pressable accessibilityRole="button" accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onPress={() => setShowPassword(!showPassword)} className="h-11 items-center justify-center px-2">
            <Text className="text-sm font-semibold text-solar-blue">{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
          </Pressable>
        </View>
        {password.length > 0 && !validPassword && <Text className="text-xs text-solar-red">A senha deve ter de 6 a 12 caracteres.</Text>}
        <View className="flex-row flex-wrap items-center justify-between gap-x-3">
          <TextAction label="Esqueci minha senha" onPress={() => setMessage('A recuperação de senha ainda não está disponível.')} />
          <TextAction label="Código SMS ou WhatsApp" onPress={() => setMessage('O acesso por código ainda não está disponível.')} />
        </View>
        <PrimaryButton
          label="Entrar na minha conta"
          disabled={!cpfValue || !validPassword}
          onPress={() => setMessage('A autenticação ainda não está conectada ao serviço de contas.')}
        />
        {!cpfValue && <StatusMessage message="Informe um CPF válido na etapa anterior para continuar." error />}
      </View>

      <SectionDivider label="ou acesse rápido" />
      <Pressable accessibilityRole="button" onPress={() => setMessage('O acesso biométrico ainda não está disponível.')} className="flex-row items-center gap-3 rounded-xl border border-solar-line bg-white p-4 active:bg-solar-pale">
        <View className="h-12 w-12 items-center justify-center rounded-xl bg-solar-pale">
          <Text className="text-2xl text-solar-blue">◎</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold text-solar-blue">Entrar com Biometria ou Face ID</Text>
          <Text className="text-xs text-solar-muted">Acesso rápido e seguro</Text>
        </View>
        <Text className="text-xl text-solar-blue">›</Text>
      </Pressable>
      {message ? <StatusMessage message={message} /> : null}

      <AuthCard className="gap-2">
        <Text className="text-base font-bold text-solar-navy">Precisa de ajuda para entrar?</Text>
        <Text className="text-xs text-solar-muted">Nossa equipe pode ajudar você a recuperar o acesso.</Text>
        <View className="flex-row gap-2 pt-1">
          {['Via WhatsApp', '0800 Solar'].map((channel) => (
            <Pressable key={channel} accessibilityRole="button" onPress={() => setMessage(`O canal ${channel} ainda não foi configurado.`)} className="h-12 flex-1 items-center justify-center rounded-xl bg-solar-pale active:opacity-70">
              <Text className="text-xs font-semibold text-solar-blue">{channel}</Text>
            </Pressable>
          ))}
        </View>
      </AuthCard>
      <TrustFooter />
    </AuthShell>
  );
}
