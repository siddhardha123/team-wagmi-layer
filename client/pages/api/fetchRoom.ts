
const createRoom = async (address : any): Promise<any>  => {
    const API_KEY = 'VwTZ4AGTxme9snANex9tep3NwvVMGfYd'; // Replace with your actual API key
    const endpoint = 'https://iriko.testing.huddle01.com/api/v1/create-room';
    const requestData = {
      title: 'Huddle01-Test',
      hostWallets: [address]
    };
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(requestData),
    });
    const roomID = await response.json()
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    console.log(roomID)
    return roomID ;
  }

export default createRoom;


