import { SymbolView } from 'expo-symbols';

// Each entry maps to SF Symbols (iOS) and Material Symbols (Android).
const ICONS = {
  home: { ios: 'house.fill', android: 'home' },
  menu: { ios: 'line.3.horizontal', android: 'menu' },
  close: { ios: 'xmark', android: 'close' },
  bell: { ios: 'bell.fill', android: 'notifications' },
  person: { ios: 'person.fill', android: 'person' },
  personCircle: { ios: 'person.crop.circle.fill', android: 'account_circle' },
  wallet: { ios: 'creditcard.fill', android: 'credit_card' },
  receipt: { ios: 'doc.text.fill', android: 'receipt_long' },
  qr: { ios: 'qrcode', android: 'qr_code_2' },
  pencil: { ios: 'pencil.and.outline', android: 'edit_document' },
  pin: { ios: 'mappin.circle.fill', android: 'location_on' },
  lock: { ios: 'lock.fill', android: 'lock' },
  shield: { ios: 'checkmark.shield.fill', android: 'shield' },
  phone: { ios: 'phone.fill', android: 'call' },
  help: { ios: 'questionmark.circle.fill', android: 'help' },
  cart: { ios: 'cart.fill', android: 'shopping_cart' },
  bag: { ios: 'bag.fill', android: 'shopping_bag' },
  store: { ios: 'storefront.fill', android: 'storefront' },
  tag: { ios: 'tag.fill', android: 'sell' },
  grid: { ios: 'square.grid.2x2.fill', android: 'grid_view' },
  star: { ios: 'star.fill', android: 'star' },
  heart: { ios: 'heart.fill', android: 'favorite' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout' },
  wrench: { ios: 'wrench.and.screwdriver.fill', android: 'build' },
  cash: { ios: 'dollarsign.circle.fill', android: 'paid' },
  directions: { ios: 'arrow.triangle.turn.up.right.diamond.fill', android: 'directions' },
  chat: { ios: 'message.fill', android: 'chat' },
  download: { ios: 'arrow.down.doc.fill', android: 'download' },
  verified: { ios: 'checkmark.seal.fill', android: 'verified' },
  sparkles: { ios: 'sparkles', android: 'auto_awesome' },
  support: { ios: 'headphones', android: 'support_agent' },
  chevron: { ios: 'chevron.right', android: 'chevron_right' },
  check: { ios: 'checkmark.circle.fill', android: 'check_circle' },
  doc: { ios: 'doc.plaintext', android: 'description' },
  sign: { ios: 'signature', android: 'draw' },
  box: { ios: 'shippingbox.fill', android: 'inventory_2' },
  eye: { ios: 'eye.fill', android: 'visibility' },
  storeFront: { ios: 'building.2.fill', android: 'store' },
  moon: { ios: 'moon.stars.fill', android: 'nightlight' },
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 24, color }: { name: IconName; size?: number; color: string }) {
  return <SymbolView name={ICONS[name]} size={size} tintColor={color} />;
}
