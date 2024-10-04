import { View, StyleSheet } from "react-native";
import Text from "./Text";

const Server = ({ server }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.cell}>{server.id}</Text>
            <Text style={{...styles.cell, borderLeftWidth: 0, borderRightWidth: 0}}>{server.alive}</Text>
            <Text style={styles.cell}>{server.players}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    cell: {
        flex: 1,
        borderColor: "black",
        borderWidth: 1
    }
});

export default Server;