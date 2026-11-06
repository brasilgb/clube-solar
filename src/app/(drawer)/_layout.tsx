import { Drawer } from 'expo-router/drawer';

import { DrawerMenu } from '@/features/home/drawer-menu';

// The home screen is the app's first screen. It serves visitors (index) and
// signed-in clients (home), like the solar-app: the drawer is available in both.
export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerMenu {...props} variant={props.state.routeNames[props.state.index] === 'home' ? 'client' : 'visitor'} />
      )}
      screenOptions={{ headerShown: false, drawerStyle: { width: '86%' } }}>
      <Drawer.Screen name="index" />
      <Drawer.Screen name="home" />
    </Drawer>
  );
}
