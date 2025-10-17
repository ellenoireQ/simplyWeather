export async function getWeatherByCoords(lat: string, long: string){
    if (!lat && !long) return null;
    try{
        const url = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(lat)}+${encodeURIComponent(long)}&key=${process.env.EXPO_PUBLIC_GEOCODING_API}`)

        const urlMain = await url.json()
        console.log(urlMain)
        return urlMain
    }catch{

    }
}