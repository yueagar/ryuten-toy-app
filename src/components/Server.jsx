import { View, StyleSheet } from "react-native";
import Text from "./Text";

import ServerStatus from "../services/ServerStatus";

let count = {
    as: [0, 0, 0, 0, 0],
    eu: [0, 0, 0, 0, 0],
    na: [0, 0, 0, 0, 0],
    sa: [0, 0, 0, 0, 0]
};

const Server = ({ region, server }) => {
    count[region][server.id - 1]++;

    console.log("4 Render Server {", region, server.id, "} -", count[region][server.id - 1]);

    const data = ServerStatus.store(state => state.regions[region][server.id - 1]);

    return (
        <View style={styles.row}>
            <Text style={styles.cell}>{data.id}</Text>
            <Text style={{ ...styles.cell, borderLeftWidth: 0, borderRightWidth: 0 }}>{data.alive}</Text>
            <Text style={styles.cell}>{data.players}</Text>
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