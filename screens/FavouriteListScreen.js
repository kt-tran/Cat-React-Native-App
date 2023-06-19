import React from "react";
import { Text, Button, View, ScrollView, StyleSheet } from "react-native";
import { useLoggerContext } from "../contexts/LoggerProvider";

export default function FavListScreen() {
    return <Text>Favourites List</Text>
}
// export default function FavListScreen() {
//     return (
//         <View style={styles.container}>
//             <EventLogList />
//         </View>
//     );
// }

// function EventLogList() {
//     const [log, setLog] = useLoggerContext();
//     return (
//         <ScrollView style={styles.container}>
//             {log.map((x) => (
//                 <EventLog {...x} key={x.name} />
//             ))}
//         </ScrollView>
//     );
// }

// function EventLog(props) {
//     return (
//         <View>
//             <View style={styles.event_title}>
//                 <Text>{props.event}</Text>
//             </View>
//             <View style={styles.event_data}>
//                 {props.data.map((x) => (
//                     <Text key={x}>{new Date(x).toString()}</Text>
//                 ))}
//             </View>
//         </View>
//     );
// }
