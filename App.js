import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./screens/Login";
import Indicadores from "./screens/Indicadores";
import BuscadorSku from "./screens/BuscadorSku";
import Noticias from "./screens/Noticias";
import Menu from "./components/Menu";
import Links from "./screens/Links";
import { AuthProvider } from "./context/UserContext";

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Drawer.Navigator
          useLegacyImplementation={true}
          initialRouteName="Indicadores"
          drawerContent={(props) => <Menu {...props} />}
        >
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              title: "Mi Ruta",
            }}
          />
          <Drawer.Screen
            name="Noticias"
            component={Noticias}
            options={{ title: "Novedades" }}
          />
          <Drawer.Screen name="Indicadores" component={Indicadores} />
          <Drawer.Screen name="Links" component={Links} />
          <Drawer.Screen
            name="BuscadorSku"
            component={BuscadorSku}
            options={{
              title: "Buscar SKU",
            }}
          />
        </Drawer.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
