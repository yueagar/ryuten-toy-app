import { useState } from "react";
import { create } from "zustand";
import { View, Text, Button } from "react-native";

const useStore = create((set) => ({
    status: false,
    setStatus: (status) => set({ status }),
}));

const TestState = ({ text }) => {
    const [status, setStatus] = useState(false);
    return (
        <View>
            <Text>Test useState and Zustand! {text}</Text>
            <Text>Status 1: {status ? "On" : "Off"}</Text>
            <Text>Status 2: {useStore(state => state.status) ? "On" : "Off"}</Text>
            <Button onPress={() => setStatus(!status)} title="Toggle status 1" />
            <Button onPress={() => useStore.setState(state => ({ status: !state.status }))} title="Toggle status 2" />
        </View>
    )
}

export default TestState;