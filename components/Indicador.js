import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import mesToTexto from "../utilities/mesToTexto";

export default function Indicador({ datos, ol, mes }) {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const pulgarSize = 40;
  //llega el indicador y un objeto con el valor y el target para comparar
  const {
    tgt,
    valor,
    texto,
    flag,
    posicion,
    descripcion,
    indicador,
    mostrarPosicion,
  } = datos;

  const mesTexto = mesToTexto(mes);

  const evaluate = (val) => {
    switch (indicador) {
      case "dqi":
        return (val * 1).toFixed(2) + "ppm";
      case "rmd":
        if (val == 0) {
          return "Sin puntajes";
        }
        return (val * 1).toFixed(2);
      case "no_modulados":
        return val * 1;
      case "reclamos":
        return val * 1;
      default:
        return (val * 100).toFixed(2) + "%";
    }
  };

  const pulgar = () => {
    if (flag == "menor") {
      if (valor <= tgt) {
        return <FontAwesome name="check" size={pulgarSize} color="green" />;
      } else {
        return (
          <Feather name="alert-circle" size={pulgarSize} color="#FF1700" />
        );
      }
    } else {
      if (valor >= tgt) {
        return <FontAwesome name="check" size={pulgarSize} color="green" />;
      } else {
        return (
          <Feather name="alert-circle" size={pulgarSize} color="#FF1700" />
        );
      }
    }
  };

  const posicionStyled = (posicion) => {
    if (!mostrarPosicion) {
      return "";
    }
    if (isNaN(posicion)) {
      return "";
    } else if (posicion < 10) {
      return (
        <Text style={styles.posicionTituloVerde}>
          {" (" + posicion + "°)"}{" "}
        </Text>
      );
    } else {
      return (
        <Text style={styles.posicionTitulo}>{" (" + posicion + "°)"} </Text>
      );
    }
  };

  const SinDatos = ({ children }) => {
    if (isNaN(valor)) {
      return <></>;
    } else {
      return children;
    }
  };

  return (
    <SinDatos>
      <Pressable
        style={styles.container}
        onPress={() => setMostrarDescripcion(!mostrarDescripcion)}
      >
        <View style={styles.topContainer}>
          <View style={styles.datosContainer}>
            <Text style={styles.titulo}>
              {texto}
              {isNaN(posicion) || mesToTexto(mes) == "hide" ? (
                <></>
              ) : (
                posicionStyled(posicion)
              )}
            </Text>
            <Text style={styles.titulo}>
              {evaluate(valor)}{" "}
              {texto == "Puntaje RMD" && (
                <Entypo name="star" size={20} color="black" />
              )}
            </Text>
            <Text style={styles.analisis}>
              Objetivo: {evaluate(tgt)}{" "}
              {texto == "Puntaje RMD" && (
                <Entypo name="star" size={16} color="black" />
              )}
            </Text>
            {isNaN(posicion) ||
            mesToTexto(mes) == "hide" ||
            !mostrarPosicion ? (
              <></>
            ) : (
              <Text style={styles.analisis}>
                {`${posicion}° en el ranking de ${mesTexto}`}
              </Text>
            )}
          </View>
          <View style={styles.icon}>{pulgar()}</View>
        </View>

        {mostrarDescripcion && (
          <View style={styles.descripcion}>
            <Text>{descripcion}</Text>
            {isNaN(posicion) ||
            mesToTexto(mes) == "hide" ||
            !mostrarPosicion ? (
              <></>
            ) : (
              <Text
                style={styles.posicion}
              >{`${posicion}° en el ranking de ${mesTexto} de ${ol}`}</Text>
            )}
          </View>
        )}
      </Pressable>
    </SinDatos>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
  },

  topContainer: {
    flexDirection: "row",
    width: "96%",
    backgroundColor: "#FFF",
    paddingVertical: 12,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  datosContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  titulo: { fontWeight: "bold", fontSize: 20 },
  analisis: { fontSize: 14 },
  separador: {
    width: "96%",
    height: 2,
    backgroundColor: "#D3D3D3",
  },
  descripcion: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: "100%",
  },
  posicion: {
    fontWeight: "bold",
    marginTop: 4,
  },
  posicionTituloVerde: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
  },
  posicionTitulo: {
    fontWeight: "normal",
    fontSize: 18,
  },
});
