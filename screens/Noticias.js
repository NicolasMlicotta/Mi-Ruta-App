import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import React, { useContext } from "react";
import Noticia from "../components/Noticia";
import colors from "../utilities/colors";
import useGetNovedades from "../hooks/useGetNovedades";
import UserContext from "../context/UserContext";

const Noticias = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const { data, getData, loading } = useGetNovedades(userData.CD, navigation);

  const handleNavigate = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            getData();
          }}
        />
      }
    >
      {!userData ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Inicie sesión para ver las novedades de su CD
          </Text>
          <Button
            title="Navegar a login"
            color={colors.titleBackground}
            onPress={handleNavigate}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator
          size="large"
          color="#0974F1"
          style={{ marginTop: 40 }}
        />
      ) : (
        <View style={styles.container}>
          {data.map((nov, index) => {
            return <Noticia datos={nov} key={index} />;
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginVertical: 12,
    minHeight: "100%",
    width: "100%",
    paddingBottom: 60,
    backgroundColor: colors.backgroundColor,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "auto",
    padding: 12,
  },
});

export default Noticias;
