import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Indicador from "../components/Indicador";

import colors from "../utilities/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getDb from "../firebase/getDb";

const Indicadores = ({ navigation }) => {
  const [db, app] = getDb();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [operador, setOperador] = useState("");
  const [loading, setLoading] = useState();
  const [indicadores, setIndicadores] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [indicadoresArray, setIndicadoresArray] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [filterAnio, setFilterAnio] = useState("2022");
  const [filterMes, setFilterMes] = useState("seleccione");
  const [mostrarFechas, setMostrarFechas] = useState(true);
  const [fechaFiltrada, setFechaFiltrada] = useState({});
  const [autenticado, setAutenticado] = useState(false);
  const [mes, setMes] = useState("");

  const getIndicadores = async (CD, mail) => {
    const docRef = doc(db, "indicadoresInfo", CD);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setIndicadoresArray(docSnap.data().indicadoresArray);
      setLoading(false);
      fetchData(mail.split("_")[0], false, docSnap.data().indicadoresArray);
    }
  };

  const clean = (valor = "") => {
    return parseFloat(valor.replace(/,/, "."));
  };

  const reduceInfo = (querySnap, arrayGestionIndicadores) => {
    //acumuladores
    let counter = 0;
    let rmd_puntaje = 0;
    let rmd_cantidad = 0;
    let pedidos_ruteados = 0;
    let pedidos_rechazados = 0;
    let hl_ruteados = 0;
    let hl_rechazados = 0;
    let no_modulados = 0;
    let reclamos = 0;
    let dqi = 0;
    let ruta_digital = 0;
    let inicio_cierre = 0;
    let ontime_uso = 0;
    let adherencia = 0;
    let pnp = 0;
    let dispersion_km = 0;
    let dispersion_tiempos = 0;
    let skap = 0;
    let cincos = 0;

    //para totales
    let prom_rmd = 0;
    let prom_rmd_cantidad = 0;
    let porcentaje_pedidos_rechazados = 0;
    let porcentaje_hl_rechazados = 0;
    let prom_dqi = 0;
    let prom_ruta_digital = 0;
    let prom_inicio_cierre = 0;
    let prom_uso_ontime = 0;
    let prom_adherencia = 0;
    let prom_pnp = 0;
    let prom_disp_km = 0;
    let prom_disp_tiempo = 0;
    let prom_skap = 0;
    let prom_cincos = 0;

    //targets
    let tgt_prom_rmd = 0;
    let tgt_rmd_cantidad = 0;
    let tgt_pedidos_rechazados = 0;
    let tgt_hl_rechazados = 0;
    let tgt_no_mod = 0;
    let tgt_reclamos = 0;
    let tgt_prom_dqi = 0;
    let tgt_ruta_digital = 0;
    let tgt_prom_inicio_cierre = 0;
    let tgt_prom_uso_ontime = 0;
    let tgt_adherencia = 0;
    let tgt_pnp = 0;
    let tgt_prom_disp_km = 0;
    let tgt_prom_disp_tiempo = 0;
    let tgt_skap = 0;
    let tgt_cincos = 0;

    //posiciones respecto del mismo Operador Logístico
    let pos_rmd = 0;
    let pos_pdv_puntuados = 0;
    let pos_pedidos_rech = 0;
    let pos_hl_rech = 0;
    let pos_no_mod = 0;
    let pos_reclamos = 0;
    let pos_dqi = 0;
    let pos_ruta_digital = 0;
    let pos_inicio_cierre = 0;
    let pos_adherencia = 0;
    let pos_uso_bees = 0;
    let pos_pnp = 0;
    let pos_disp_km = 0;
    let pos_disp_tiempo = 0;
    let pos_skap = 0;
    let pos_cincos = 0;

    querySnap.forEach((doc) => {
      let val = doc.data();
      rmd_puntaje += clean(val.rmd_puntaje);
      rmd_cantidad += clean(val.rmd_cantidad);
      pedidos_ruteados += clean(val.pedidos_ruteados);
      pedidos_rechazados += clean(val.pedidos_rechazados);
      hl_ruteados += clean(val.hl_ruteados);
      hl_rechazados += clean(val.hl_rechazados);
      no_modulados += clean(val.no_modulados);
      reclamos += clean(val.reclamos);
      dqi += clean(val.dqi);
      ruta_digital += clean(val.ruta_digital);
      inicio_cierre += clean(val.inicio_cierre);
      ontime_uso += clean(val.ontime_uso);
      adherencia += clean(val.adherencia);
      pnp += clean(val.pnp);
      dispersion_km += clean(val.dispersion_km);
      dispersion_tiempos += clean(val.dispersion_tiempos);
      skap += clean(val.skap);
      cincos += clean(val.cincos);

      //targets (16)
      tgt_prom_rmd += clean(val.tgt_prom_rmd);
      tgt_rmd_cantidad += clean(val.tgt_rmd_cantidad);
      tgt_pedidos_rechazados += clean(val.tgt_pedidos_rechazados);
      tgt_hl_rechazados += clean(val.tgt_hl_rechazados);
      tgt_no_mod += clean(val.tgt_no_mod);
      tgt_reclamos += clean(val.tgt_reclamos);
      tgt_prom_dqi += clean(val.tgt_prom_dqi);
      tgt_ruta_digital += clean(val.tgt_ruta_digital);
      tgt_prom_inicio_cierre += clean(val.tgt_prom_inicio_cierre);
      tgt_prom_uso_ontime += clean(val.tgt_prom_uso_ontime);
      tgt_adherencia += clean(val.tgt_adherencia);
      tgt_pnp += clean(val.tgt_pnp);
      tgt_prom_disp_km += clean(val.tgt_prom_disp_km);
      tgt_prom_disp_tiempo += clean(val.tgt_prom_disp_tiempo);
      tgt_skap += clean(val.tgt_skap);
      tgt_cincos += clean(val.tgt_cincos);

      //posiciones respecto del mismo Operador Logístico (16)
      pos_rmd = clean(val.pos_rmd);
      pos_pdv_puntuados = clean(val.pos_pdv_puntuados);
      pos_pedidos_rech = clean(val.pos_pedidos_rech);
      pos_hl_rech = clean(val.pos_hl_rech);
      pos_no_mod = clean(val.pos_no_mod);
      pos_reclamos = clean(val.pos_reclamos);
      pos_dqi = clean(val.pos_dqi);
      pos_ruta_digital = clean(val.pos_ruta_digital);
      pos_inicio_cierre = clean(val.pos_inicio_cierre);
      pos_uso_bees = clean(val.pos_uso_bees);
      pos_adherencia = clean(val.pos_adherencia);
      pos_pnp = clean(val.pos_pnp);
      pos_disp_km = clean(val.pos_disp_km);
      pos_disp_tiempo = clean(val.pos_disp_tiempo);
      pos_cincos = clean(val.pos_cincos);
      pos_skap = clean(val.pos_skap);

      //contador
      counter += 1;

      if (counter == 1) {
        setMaxDate(val.fecha);
        setMinDate(val.fecha);
        setMes(val.mes);
      } else {
        setMinDate(val.fecha);
        if (filterMes > val.mes) {
          setMes(filterMes);
        } else {
          setMes(val.mes);
        }
      }
    });

    //termina el forEach()
    //valores finales para mostrar en componente
    if (rmd_cantidad > 0) {
      prom_rmd = rmd_puntaje / rmd_cantidad;
    } else {
      prom_rmd = 0;
    }
    prom_rmd_cantidad = rmd_cantidad / pedidos_ruteados;
    porcentaje_pedidos_rechazados = pedidos_rechazados / pedidos_ruteados;
    porcentaje_hl_rechazados = hl_rechazados / hl_ruteados;
    prom_dqi = dqi / counter;
    prom_ruta_digital = ruta_digital / counter;
    prom_inicio_cierre = inicio_cierre / counter;
    prom_uso_ontime = ontime_uso / counter;
    prom_adherencia = adherencia / counter;
    prom_pnp = pnp / pedidos_ruteados;
    prom_disp_km = dispersion_km / counter;
    prom_disp_tiempo = dispersion_tiempos / counter;
    prom_cincos = cincos / counter;
    prom_skap = skap / counter;

    //targets finales para mostrar en componente
    tgt_prom_rmd /= counter;
    tgt_rmd_cantidad /= counter;
    tgt_pedidos_rechazados /= counter;
    tgt_hl_rechazados /= counter;
    tgt_no_mod /= counter;
    tgt_reclamos /= counter;
    tgt_prom_dqi /= counter;
    tgt_ruta_digital /= counter;
    tgt_prom_inicio_cierre /= counter;
    tgt_prom_uso_ontime /= counter;
    tgt_adherencia /= counter;
    tgt_pnp /= counter;
    tgt_prom_disp_km /= counter;
    tgt_prom_disp_tiempo /= counter;
    tgt_cincos /= counter;
    tgt_skap /= counter;

    let arrayFinal = [];
    arrayGestionIndicadores.forEach((item) => {
      if (item.habilitado) {
        let obj = {
          indicador: item.indicador,
          texto: item.texto,
          flag: item.flag,
          descripcion: item.descripcion,
          mostrarPosicion: item.mostrarPosicion,
        };
        switch (item.indicador) {
          case "rmd":
            arrayFinal.push({
              ...obj,
              tgt: tgt_prom_rmd,
              valor: prom_rmd,
              posicion: pos_rmd,
            });
            break;
          case "rmd_puntaje":
            arrayFinal.push({
              ...obj,
              tgt: tgt_rmd_cantidad,
              valor: prom_rmd_cantidad,
              posicion: pos_pdv_puntuados,
            });
            break;
          case "rechazo_pedidos":
            arrayFinal.push({
              ...obj,
              tgt: tgt_pedidos_rechazados,
              valor: porcentaje_pedidos_rechazados,
              posicion: pos_pedidos_rech,
            });
            break;
          case "rechazo_hl":
            arrayFinal.push({
              ...obj,
              tgt: tgt_hl_rechazados,
              valor: porcentaje_hl_rechazados,
              posicion: pos_hl_rech,
            });
            break;
          case "no_modulados":
            arrayFinal.push({
              ...obj,
              tgt: tgt_no_mod,
              valor: no_modulados,
              posicion: pos_no_mod,
            });
            break;
          case "reclamos":
            arrayFinal.push({
              ...obj,
              tgt: tgt_reclamos,
              valor: reclamos,
              posicion: pos_reclamos,
            });
            break;
          case "dqi":
            arrayFinal.push({
              ...obj,
              tgt: tgt_prom_dqi,
              valor: prom_dqi,
              posicion: pos_dqi,
            });
            break;
          case "ruta_digital":
            arrayFinal.push({
              ...obj,
              tgt: tgt_ruta_digital,
              valor: prom_ruta_digital,
              posicion: pos_ruta_digital,
            });
            break;
          case "inicio_cierre":
            arrayFinal.push({
              ...obj,
              tgt: tgt_prom_inicio_cierre,
              valor: prom_inicio_cierre,
              posicion: pos_inicio_cierre,
            });
            break;
          case "cliqueo":
            arrayFinal.push({
              ...obj,
              tgt: tgt_prom_uso_ontime,
              valor: prom_uso_ontime,
              posicion: pos_uso_bees,
            });
            break;
          case "adherencia":
            arrayFinal.push({
              ...obj,
              tgt: tgt_adherencia,
              valor: prom_adherencia,
              posicion: pos_adherencia,
            });
            break;
          case "pnp":
            arrayFinal.push({
              ...obj,
              tgt: tgt_pnp,
              valor: prom_pnp,
              posicion: pos_pnp,
            });
            break;
          case "disp_km":
            arrayFinal.push({
              ...obj,
              tgt: tgt_prom_disp_km,
              valor: prom_disp_km,
              posicion: pos_disp_km,
            });
            break;
          case "disp_tiempos":
            arrayFinal.push({
              ...obj,
              tgt: tgt_prom_disp_tiempo,
              valor: prom_disp_tiempo,
              posicion: pos_disp_tiempo,
            });
            break;
          case "cincos":
            arrayFinal.push({
              ...obj,
              tgt: tgt_cincos,
              valor: prom_cincos,
              posicion: pos_cincos,
            });
            break;
          case "skap":
            arrayFinal.push({
              ...obj,
              tgt: tgt_skap,
              valor: prom_skap,
              posicion: pos_skap,
            });
            break;
        }
      }
    });
    setIndicadores(arrayFinal);
    setLoading(false);
  };

  const fetchData = async (ref, diez, arrayGestionIndicadores) => {
    setLoading(true);
    if (ref == "") {
      alert("Inicie Sesión");
      navigation.navigate("Login");
    } else {
      const db = getFirestore(app);
      if (filterMes == "todos") {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          where("anio", "==", filterAnio)
        );
        reduceInfo(await getDocs(q), arrayGestionIndicadores);
      } else if (filterMes != "seleccione") {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          where("mes", "==", filterMes),
          where("anio", "==", filterAnio)
        );
        reduceInfo(await getDocs(q), arrayGestionIndicadores);
      } else if (diez) {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          orderBy("aniomesdia", "desc"),
          limit(10)
        );
        reduceInfo(await getDocs(q), arrayGestionIndicadores);
      } else {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          orderBy("aniomesdia", "desc"),
          limit(1)
        );
        reduceInfo(await getDocs(q), arrayGestionIndicadores);
      }
    }
  };

  const getOperador = async (mail) => {
    const docRef = doc(db, "usuarios", mail);
    const docSnap = await getDoc(docRef);
    setOperador(docSnap.data().ol);
    getIndicadores(docSnap.data().CD, mail);
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsuscribe = onAuthStateChanged(auth, (user) => {
        //armar if mail != "" fetch data
        if (user) {
          setEmail(user.email.split("_")[0]);
          setAutenticado(true);
          // fetchData(user.email.split("_")[0]);
          getOperador(user.email);

          // ...
        } else {
          alert("Inicie Sesión");
          navigation.navigate("Login");
        }
      });
      return unsuscribe();
    }, [])
  );

  const handleFiltros = () => {
    fetchData(email, false, indicadoresArray);
    setMostrarFechas(false);
    let mesOk = filterMes == "seleccione" ? "" : filterMes;
    setFechaFiltrada({ anio: " Año: " + filterAnio, mes: "Mes: " + mesOk });
    handleModal(false);
  };

  const handleClickDiez = () => {
    fetchData(email, true, indicadoresArray);
    setMostrarFechas(false);
    handleModal(false);
    setFechaFiltrada({ anio: "", mes: "Últimos 10 repartos" });
  };

  const handleClickUltimo = () => {
    fetchData(email, false, indicadoresArray);
    setMostrarFechas(false);
    handleModal(false);
    setMostrarFechas(true);
  };

  const handleModal = (bool) => {
    setMostrarFiltros(bool);
    setFilterMes("seleccione");
    setFilterAnio("2022");
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0974F1"
          style={{ marginTop: 40 }}
        />
      )}
      {autenticado && (
        <ScrollView>
          <View style={styles.botonesContainer}>
            <View style={styles.fecha}>
              {mostrarFechas ? (
                <Text>{minDate + " - " + maxDate}</Text>
              ) : (
                <Text>{fechaFiltrada.mes + " " + fechaFiltrada.anio}</Text>
              )}
            </View>
            <Pressable
              style={styles.iconbox}
              onPress={() => handleModal(!mostrarFiltros)}
            >
              <FontAwesome name="filter" size={24} color="black" />
            </Pressable>
          </View>
          {mostrarFiltros && (
            <View style={{ paddingHorizontal: 14 }}>
              <View>
                <B>Año</B>
                <Picker
                  selectedValue={filterAnio}
                  onValueChange={(itemValue) => setFilterAnio(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="2022" value="2022" />
                  <Picker.Item label="2023" value="2023" />
                  <Picker.Item label="2024" value="2024" />
                  <Picker.Item label="2025" value="2025" />
                </Picker>
                <B>Mes</B>
                <Picker
                  selectedValue={filterMes}
                  onValueChange={(itemValue) => setFilterMes(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccione" value="seleccione" />
                  <Picker.Item label="Todos" value="todos" />
                  <Picker.Item label="Enero" value="1" />
                  <Picker.Item label="Febrero" value="2" />
                  <Picker.Item label="Marzo" value="3" />
                  <Picker.Item label="Abril" value="4" />
                  <Picker.Item label="Mayo" value="5" />
                  <Picker.Item label="Junio" value="6" />
                  <Picker.Item label="Julio" value="7" />
                  <Picker.Item label="Agosto" value="8" />
                  <Picker.Item label="Septiembre" value="9" />
                  <Picker.Item label="Octubre" value="10" />
                  <Picker.Item label="Noviembre" value="11" />
                  <Picker.Item label="Diciembre" value="12" />
                </Picker>
              </View>
              <Pressable onPress={handleFiltros} style={styles.botonSemanas}>
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 14 }}
                >
                  Filtrar Indicadores
                </Text>
              </Pressable>
              <View>
                <Text style={{ marginTop: 40 }}>
                  <B>También podés elegir:</B>
                </Text>
              </View>
              <View style={styles.otrasOpciones}>
                <Pressable onPress={handleClickUltimo} style={styles.opcion}>
                  <MaterialIcons name="filter-1" size={24} color="black" />
                  <Text style={styles.verOtros}> Ver último reparto</Text>
                </Pressable>
                <Pressable onPress={handleClickDiez} style={styles.opcion}>
                  <MaterialCommunityIcons
                    name="numeric-10-box-multiple-outline"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.verOtros}> Ver últimos 10 repartos</Text>
                </Pressable>
              </View>
            </View>
          )}
          {!mostrarFiltros && (
            <View style={styles.scrollView}>
              {indicadores.map((objeto) => {
                return (
                  <Indicador
                    datos={objeto}
                    key={objeto.texto}
                    ol={operador}
                    mes={mes}
                  />
                );
              })}
            </View>
          )}
        </ScrollView>
      )}
      {!autenticado && (
        <View style={styles.scrollView}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Inicie Sesión
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const B = (props) => <Text style={styles.bold}>{props.children}</Text>;

const styles = StyleSheet.create({
  bold: { fontWeight: "bold", color: colors.primary, fontSize: 16 },
  container: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
  },
  botonesContainer: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  fecha: {
    height: 30,
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconbox: {
    width: 60,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  botonSemanas: {
    marginTop: 50,
    backgroundColor: colors.titleBackground,
    width: "auto",
    paddingHorizontal: 14,
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    marginBottom: 8,
    borderRadius: 16,
  },
  scrollView: { display: "flex", alignItems: "center" },
  text: {
    fontSize: 42,
  },
  picker: {
    height: 32,
    marginBottom: 20,
    borderColor: "red",
    backgroundColor: "#f9f9f9c9",
  },
  otrasOpciones: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: 12,
  },
  opcion: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 12,
  },
  verOtros: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default Indicadores;
