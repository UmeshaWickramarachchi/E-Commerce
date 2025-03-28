import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
    width: "100%",
    height: "400px"
}

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const GoogleMapView = ({ lat, lng }) => {
    const center = {
        lat: typeof lat === "number" && !isNaN(lat) ? lat : 0,
        lng: typeof lng === "number" && !isNaN(lng) ? lng : 0
    }

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
            {console.log(center)}
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                {lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng) && (
                    <Marker position={center} />
                )}
            </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMapView
