import { Image, StyleSheet, Text, View } from "react-native";

const imageMap: Record<string, any> = {
    "1": {
    rain: require("../../assets/forecasts/glass/rain.png"),
    clear: require("../../assets/forecasts/glass/clear.png"),
    cloudy: require("../../assets/forecasts/glass/cloudy.png"),
    sunny: require("../../assets/forecasts/glass/sunny.png"),
    },
    "0": {
    rain: require("../../assets/forecasts/glass/night/rain.png"),
    clear: require("../../assets/forecasts/glass/night/clear.png"),
    cloudy: require("../../assets/forecasts/glass/night/cloudy.png"),
    sunny: require("../../assets/forecasts/glass/night/cloudy.png"),
    }
}

export default function Card({title, desc, urlImg}: {title: String, desc: String, urlImg: string}){
    return (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={imageMap[urlImg]} style={styles.cardImage}/>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{desc}</Text>
          </View>
        </View>
    )
}

// Parent component yang menggunakan row
export function CardRow() {
    return (
        <View style={styles.rowContainer}>
            <Card 
                title="Wind" 
                desc="10 km/h" 
                urlImg="wind" 
            />
            <Card 
                title="Humidity" 
                desc="65%" 
                urlImg="humidity" 
            />
            <Card 
                title="Rain" 
                desc="30%" 
                urlImg="rain" 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        borderRadius: 22,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        width: 100,
    },
    cardContent: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center'
    },
    cardImage: {
        width: 30, 
        height: 30, 
        justifyContent: 'center'
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
})