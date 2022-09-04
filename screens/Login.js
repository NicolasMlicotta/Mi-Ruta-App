import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import colors from "../utilities/colors";
import UserContext from "../context/UserContext";

function Login({ navigation }) {
  const { login, logout, userData } = useContext(UserContext);
  const password = "123456";
  const [usuario, setUsuario] = useState("");

  const handleLogin = () => {
    if (usuario == "") {
      alert("Escriba su dni");
      return;
    } else {
      login(usuario, password, navigation);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {!userData ? (
        <>
          <TextInput
            onChangeText={setUsuario}
            value={usuario}
            placeholder="Escriba su DNI"
            style={styles.textInput}
            keyboardType="numeric"
          />
          <View style={styles.btnContainer}>
            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              color={colors.titleBackground}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16 }}>
            Iniciaste sesión con DNI: {userData.dni}
          </Text>
          <View style={styles.btnContainer}>
            <Button
              title="Cerrar Sesión"
              color={colors.titleBackground}
              onPress={handleLogout}
            />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: "10%",
    marginTop: 8,
    width: "96%",
    backgroundColor: colors.fill,
    padding: 14,
    justifyContent: "center",
    marginHorizontal: "auto",
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 14,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default Login;
