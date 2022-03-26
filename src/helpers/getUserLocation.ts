
export const getUserLocation = async (): Promise<[number, number]> => {

  return new Promise( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition( (position) => {  
      const { latitude, longitude } = position.coords;
      resolve([latitude, longitude]);
    }, (error) => {
      reject(error);
    });
  });
}