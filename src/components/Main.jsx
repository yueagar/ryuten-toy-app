import { useEffect } from "react";
import { View, Pressable, FlatList, StyleSheet } from "react-native";
import Text from "./Text";

import Time from "./Time";
import Region from "./Region";

import ServerStatus from "../services/ServerStatus";

const dataObj = {
    as: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    eu: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    na: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    sa: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
};

let count = 0;

const Main = () => {
    count++;

    useEffect(() => {
        ServerStatus.getAll();
    }, []);

    console.log("1 Render Main -", count);

    return (
        <View style={styles.container}>
            <Time />
            <Pressable style={styles.refreshBtn} onPress={ServerStatus.getAll}>
                <Text fontSize="subheading">Refresh</Text>
            </Pressable>
            <Separator />
            <FlatList
                data={Object.entries(dataObj)}
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