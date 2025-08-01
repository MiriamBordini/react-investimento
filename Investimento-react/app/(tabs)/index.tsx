import { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 20
  },
  title: {
    fontSize: 26,
    color: "#AA2200",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#121212",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  input: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 18,
  }
});

export default function Index() {
  const [mensal, setMensal] = useState("");
  const [meses, setMeses] = useState("");
  const [juros, setJuros] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularInvestimento = () => {
    const mensalNum = parseFloat(mensal);
    const t = parseInt(meses);
    const i = parseFloat(juros) / 100; // taxa mensal em decimal

    if (isNaN(mensalNum) || isNaN(t) || isNaN(i) || t <= 0) {
      setResultado("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Sem juros
    const montanteSemJuros = mensalNum * t;

    // Com juros compostos mensais
    let montanteComJuros = 0;
    for (let j = 1; j <= t; j++) {
      montanteComJuros = montanteComJuros + montanteComJuros * i + mensalNum;
    }

    setResultado(
      `Montante sem juros: R$ ${montanteSemJuros.toFixed(2)}\nMontante com juros: R$ ${montanteComJuros.toFixed(2)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Investimento</Text>

      <TextInput
        placeholder="Valor mensal a investir (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={mensal}
        onChangeText={setMensal}
      />

      <TextInput
        placeholder="Número de meses"
        style={styles.input}
        keyboardType="numeric"
        value={meses}
        onChangeText={setMeses}
      />

      <TextInput
        placeholder="Taxa de juros mensal (%)"
        style={styles.input}
        keyboardType="numeric"
        value={juros}
        onChangeText={setJuros}
      />

      <Button title="Calcular" onPress={calcularInvestimento} />

      <Text style={styles.text}>{resultado}</Text>
    </View>
  );
}
