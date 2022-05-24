import React from "react";
import {Text, View} from "react-native";

interface TableProps {
    data: Array<any>,
    cols: Array<string>
}

const Table: React.FC<TableProps> = (props: TableProps) => {
    return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Row data={props.cols}/>
                {
                    props.data.map((datum, idx) => {
                        const rowData = props.cols.map(col => datum[col]);
                        return <Row key={idx} data={rowData}/>
                    })
                }
            </View>
    )
}

interface RowProps {
    data: Array<any>
}

const Row: React.FC<RowProps> = (props: RowProps) => {
    return (
            <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
                {props.data.map((datum, idx) => {
                    return (<View key={idx} style={{alignSelf: 'stretch'}}>
                        <Text>{datum} {" "}</Text>
                    </View>);
                })}
            </View>
    );
}

export default Table;