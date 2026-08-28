import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta } from '../mensagens';

function MetaInput(props){

const [inputMetaText  , setInputMetaText] = useState('');

function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  };

function addMetaHandler(){
    props.onAddMeta(inputMetaText);
    setInputMetaText('');
}

return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '65%'}}>
            <TextInput onChangeText={metaInputHandler} style={styles.inputText} placeholder={rotulo_input_meta} />
        </View>

        <View style={{width: '30%', marginTop: 10}}>
            <Button onPress={addMetaHandler} title={rotulo_btn_cadastro_meta} />
        </View>
    </View>

);
}

export default MetaInput;

const styles = StyleSheet.create({
    inputText: {
        backgroundColor: '#eaefff',
        borderColor: '#364277',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
        color: '#364277',
    },
});