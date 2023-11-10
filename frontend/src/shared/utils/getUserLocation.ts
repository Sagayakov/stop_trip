export const getUserLocation = (): number[] | null => {
    let userLocation: number[] = [];
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                userLocation = [lat, lng];
                return userLocation;
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
    return null;
};
