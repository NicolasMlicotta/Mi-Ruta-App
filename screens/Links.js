import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import React, { useContext } from "react";
import colors from "../utilities/colors";
import useCdLinks from "../hooks/useCdLinks";
import UrlLink from "../components/UrlLink";
import UserContext from "../context/UserContext";

const Links = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const { links, loading } = useCdLinks(userData.CD);

  const handleNavigate = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView>
      {!userData ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Inicie sesión para ver los links de su CD
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
          style={styles.loading}
        />
      ) : (
        <View style={styles.container}>
          {links.map((link, index) => {
            return <UrlLink key={index} link={link} />;
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
  loading: { marginTop: 40 },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "auto",
    padding: 12,
  },
});

export default Links;
