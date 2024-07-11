import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { getUser } from '../../../store';
import { APILibrary } from '../../../service';

const UserPoint = () => {
    const userInfo = getUser()
    const [point, setPoint] = useState(null);

    useEffect(() => {
        getPoint();
      return () => {
      };
    }, [])

    const getPoint = async () => {
        const today = new Date();
        const item = await APILibrary.GetMileage(userInfo.idno, today.getFullYear());
        if (item && !isNaN(item)) {
            setPoint(item);
        }
        else {
            setPoint(null);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Feather name="award" size={14} style={{color:'#F2B53C'}} />
                {point != null && 
                <Text style={{ color: "#a7a7a7", paddingLeft: 0 }}>
                {` ${Number(point.data)
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
                    <Text
                        style={{ color: "#CE3C3E", fontSize: 14, fontWeight: "bold" }}
                    >
                        &nbsp;P
                    </Text>
                </Text>
                }
                {point === null &&
                    <Text style={{ color: "#a7a7a7" }}>
                    {` 0 `}
                    <Text
                    style={{
                        color: "#CE3C3E",
                        fontSize: 14,
                        fontWeight: "bold"
                    }}
                    >
                    P
                    </Text>
                </Text>
                }
            </View>
        </View>
    );
};

export default UserPoint;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    box: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#666',
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        alignItems: 'center',
        marginRight: 10
    }
})