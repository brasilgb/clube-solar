import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { AuthCard, AuthShell, PrimaryButton, SectionDivider, StatusMessage, TextAction, TrustFooter } from './components';
import { cpfDigits, formatCpf, isValidCpf } from './cpf';

export function CpfLoginScreen() {
  const [cpf, setCpf] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMessage] = useState('');
  const digits = cpfDigits(cpf);
  const valid = isValidCpf(cpf);
  const feedback = digits.length === 0
    ? 'Digite os 11 números do seu documento'
    : digits.length < 11
      ? `Faltam ${11 - digits.length} dígitos`
      : valid
        ? 'CPF válido e pronto para prosseguir'
        : 'Por favor, revise o número do CPF digitado';

  return (
    <AuthShell step={1}>
      <View className="gap-2 rounded-2xl bg-solar-pale p-4">
        <Text className="text-xs font-bold uppercase tracking-wider text-solar-blue">◉  Identificação segura</Text>
        <Text className="text-2xl font-extrabold text-solar-navy">Acesse sua conta</Text>
        <Text className="text-sm leading-6 text-solar-muted">
          Informe seu CPF para consultar seus carnês, limite de crediário e cashback do Clube Solar.
        </Text>
      </View>

      <AuthCard className="gap-4">
        <View className="gap-2">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-sm font-bold text-solar-navy">CPF</Text>
            <TextAction label="Dúvidas com CPF?" onPress={() => setShowHelp(!showHelp)} />
          </View>
          <View className="h-14 flex-row items-center rounded-xl bg-solar-pale px-4">
            <Text className="mr-3 text-lg text-solar-blue">◎</Text>
            <TextInput
              accessibilityLabel="CPF"
              autoComplete="off"
              keyboardType="number-pad"
              maxLength={14}
              placeholder="000.000.000-00"
              placeholderTextColor="#94A3B8"
              value={cpf}
              onChangeText={(value) => { setCpf(formatCpf(value)); setMessage(''); }}
              className="h-full flex-1 text-lg font-semibold tracking-wider text-solar-navy"
            />
            {digits.length > 0 && (
              <Pressable accessibilityRole="button" accessibilityLabel="Limpar CPF" onPress={() => setCpf('')} className="h-10 w-10 items-center justify-center">
                <Text className="text-xl text-solar-muted">×</Text>
              </Pressable>
            )}
          </View>
          <Text className={`text-xs ${digits.length === 11 ? (valid ? 'text-solar-green' : 'text-solar-red') : 'text-solar-muted'}`}>{feedback}</Text>
          {showHelp && (
            <View className="rounded-xl bg-solar-pale p-3">
              <Text className="text-sm leading-5 text-solar-navy">O CPF permite consultar seus carnês, emitir a 2ª via de boletos, conferir cashback e acompanhar entregas.</Text>
            </View>
          )}
        </View>
        <PrimaryButton label="Avançar" disabled={!valid} onPress={() => router.push({ pathname: '/senha', params: { cpf: digits } })} />
        <View className="flex-row justify-center gap-4">
          <Text className="text-xs text-solar-muted">● Dados protegidos</Text>
          <Text className="text-xs text-solar-muted">● Lojas Solar</Text>
        </View>
      </AuthCard>

      <SectionDivider label="ou acesse com" />
      <View className="flex-row gap-3">
        {['Gov.br', 'Google'].map((provider) => (
          <Pressable key={provider} accessibilityRole="button" onPress={() => setMessage(`O acesso com ${provider} ainda não está disponível.`)} className="h-12 flex-1 items-center justify-center rounded-xl border border-solar-line bg-white active:bg-solar-pale">
            <Text className="font-semibold text-solar-blue">{provider}</Text>
          </Pressable>
        ))}
      </View>
      {message ? <StatusMessage message={message} /> : null}
      <AuthCard className="gap-2 bg-solar-pale">
        <Text className="text-sm font-semibold text-solar-navy">Seus dados estão protegidos</Text>
        <Text className="text-xs leading-5 text-solar-muted">Tratamos suas informações de acordo com a LGPD e a política de privacidade das Lojas Solar.</Text>
      </AuthCard>
      <View className="items-center">
        <Text className="text-sm text-solar-muted">Ainda não possui conta?</Text>
        <TextAction label="Primeiro acesso? Cadastre-se" onPress={() => setMessage('O cadastro ainda não está disponível.')} />
        <TextAction label="Precisa de ajuda? Fale no WhatsApp" onPress={() => setMessage('O canal de WhatsApp ainda não foi configurado.')} />
      </View>
      <TrustFooter />
    </AuthShell>
  );
}
