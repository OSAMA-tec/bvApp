import { View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get('window');

const LocationMap = ({ location, city }) => {
    const cityCoordinates = {
        'Islamabad': { lat: 33.6844, lng: 73.0479 },
        'Lahore': { lat: 31.5204, lng: 74.3587 },
        'Karachi': { lat: 24.8607, lng: 67.0011 },
        'Rawalpindi': { lat: 33.6007, lng: 73.0679 },
        'Faisalabad': { lat: 31.4504, lng: 73.1350 }
    };

    if (!city || !cityCoordinates[city]) {
        return null;
    }

    return (
        <Animatable.View
            animation="fadeIn"
            className="rounded-xl overflow-hidden"
            style={{ height: 200, width: width - 32 }}
        >
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: cityCoordinates[city].lat,
                    longitude: cityCoordinates[city].lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: cityCoordinates[city].lat,
                        longitude: cityCoordinates[city].lng,
                    }}
                    title={location}
                    description={`Selected location in ${city}`}
                />
            </MapView>
        </Animatable.View>
    );
};

export default LocationMap; 