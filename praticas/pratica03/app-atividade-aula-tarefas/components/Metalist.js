import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { rotulo_lista_metas } from '../mensagens';

function MetaList(props) {
    return (
        <View style={{flex: 1}}>
            <View style={{width: 250, alignSelf: 'center'}}>
                <Text style={styles.Text}>{rotulo_lista_metas}</Text>
            </View>

            <ScrollView>
                {props.array.map((meta, index) => <Text key={index} style={styles.item}>{meta}</Text>)}
            </ScrollView>
        </View>
    );
};

export default MetaList;

const styles = StyleSheet.create({
    Text: {
        backgroundColor: '#364277',
        borderColor: '#29325b',
        borderWidth: 3,
        borderRadius: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        padding: 3,
        marginBottom: 10,
        marginTop: 20,
    },
    item: {
        margin: 8,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#98a5dc',
        borderColor: '#364277',
        borderWidth: 2,
        color: '#364277',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});