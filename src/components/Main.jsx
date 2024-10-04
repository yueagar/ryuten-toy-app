import { useEffect } from "react";
import { View, Pressable, FlatList, StyleSheet } from "react-native";
import Text from "./Text";

import ServerStatus from "../services/ServerStatus";

import Region from "./Region";

const Main = () => {
    useEffect(() => {
        ServerStatus.getAll();
    }, []);

    const data = ServerStatus.store(state => state.regions);
    return (
        <View style={styles.container}>
            <Text>
                Last Update: {new Date().toLocaleTimeString()}
            </Text>
            <Pressable style={styles.refreshBtn} onPress={ServerStatus.getAll}>
                <Text fontSize="subheading">Refresh</Text>
            </Pressable>
            <Separator />
            <FlatList
                data={Object.entries(data)}
                ItemSeparatorComponent={Separator}
                renderItem={({ item }) => <Region key={item[0]} name={item[0]} servers={item[1]} />}
            />
        </View>
    )
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#fff",
    },
    refreshBtn: {
        padding: 5,
        backgroundColor: "#f0f0f0",
        alignSelf: "flex-start"
    },
    separator: {
        height: 10
    }
});

export default Main;