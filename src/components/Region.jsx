import { View, StyleSheet } from "react-native";
import Text from "./Text";

import Server from "./Server";

const Region = ({ name, servers }) => {
    return (
        <View>
            <View>
                <Text fontSize="heading" fontWeight="bold">{name.toUpperCase()}</Text>
            </View>
            <View style={styles.headers}>
                <Text style={styles.header} fontSize="subheading">ID</Text>
                <Text style={{...styles.header, borderLeftWidth: 0, borderRightWidth: 0}} fontSize="subheading">Alive</Text>
                <Text style={styles.header} fontSize="subheading">Total</Text>
            </View>
            {servers.sort((a, b) => a.id - b.id).map(server => <Server key={server.id} server={server} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    headers: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    header: {
        flex: 1,
        borderColor: "black",
        borderWidth: 1
    }
});

export default Region;