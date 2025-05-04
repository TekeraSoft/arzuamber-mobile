import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mapWrapper}>
                <MapView
                    style={styles.map}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    scrollEnabled={true}
                    initialRegion={{
                        latitude: 36.89626173862456,
                        longitude: 30.712952859088592,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 36.88796429673831, longitude: 30.699993257671156 }}
                        title="ARZUAMBER MODA"
                        description="Modanın Temsilci Adresi"
                    />
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    mapWrapper: {
        width: '95%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden', // 🔑 Haritayı kırpmak için bu şart
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;