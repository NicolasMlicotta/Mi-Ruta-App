import { DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome, Foundation, Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import colors from "../utilities/colors";

function Menu(props) {
  const navigation = props.navigation;
  const iconSize = 20;
  return (
    <View>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>Mi Ruta</Text>
        <Image style={styles.icono} source={require("../assets/icon.png")} />
      </View>
      <View style={styles.itemsContainer}>
        <DrawerItem
          label="Buscar SKU"
          labelStyle={{ color: colors.primary }}
          icon={() => (
            <FontAwesome name="search" size={iconSize} color={colors.primary} />
          )}
          onPress={() => navigation.navigate("BuscadorSku")}
        />
        <DrawerItem
          label="Indicadores"
          labelStyle={{ color: colors.primary }}
          icon={() => (
            <Foundation name="target" size={24} color={colors.primary} />
          )}
          onPress={() => navigation.navigate("Indicadores")}
        />
        <DrawerItem
          label="Novedades"
          labelStyle={{ color: colors.primary }}
          onPress={() => navigation.navigate("Noticias")}
          icon={() => (
            <FontAwesome
              name="newspaper-o"
              size={iconSize}
              color={colors.primary}
            />
          )}
        />
        <DrawerItem
          label="Links útiles"
          labelStyle={{ color: colors.primary }}
          onPress={() => navigation.navigate("Links")}
          icon={() => (
            <Feather
              name="external-link"
              size={iconSize}
              color={colors.primary}
            />
          )}
        />
        <DrawerItem
          label="Login"
          labelStyle={{ color: colors.primary }}
          onPress={() => navigation.navigate("Login")}
          icon={() => (
            <Entypo name="login" size={iconSize} color={colors.primary} />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tituloContainer: {
    marginLeft: 17,
    marginTop: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  icono: { height: 36, width: 36, marginLeft: 8, marginBottom: -4 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemsContainer: {
    marginTop: 16,
  },
});
export default Menu;
