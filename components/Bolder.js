import colors from "../utilities/colors";
import { Text } from "react-native";

const Bolder = ({ children, color = colors.primary }) => (
  <Text style={{ fontWeight: "bold", color: color }}>{children}</Text>
);

export default Bolder;
