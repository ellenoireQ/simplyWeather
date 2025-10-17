export async function getCoords(city: string){
    try{
        const url = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=26be795553214f83a0600695a2dc839c`)
        const res = await url.json()

        return res
    }catch{
        //
    }
}