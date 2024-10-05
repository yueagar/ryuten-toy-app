import { View } from "react-native";
import Text from "./Text";

import ServerStatus from "../services/ServerStatus";

let count = 0;

const Time = () => {
    count++;
    console.log("2 Render Time -", count);
    const time = ServerStatus.store(state => state.time);
    return (
        <View>
            <Text fontSize="subheading">Last update: {time}</Text>
        </View>
    )
}

export default Time;