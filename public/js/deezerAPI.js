// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://deezerdevs-deezer.p.rapidapi.com/infos',
//   headers: {
//     'X-RapidAPI-Key': '52b771059dmsh5bd99cfdc49f7bep17279fjsn6a5143189eaa',
//     'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
//   }
// };

// async function fetchDeezerInfo() {
//   try {
//     const response = await axios.request(options);
//     if (response.status === 200) {
//       const responseData = response.data;
//       console.log('Response Data:', responseData);
//       // Update UI or perform further processing
//     } else {
//       console.error('Error: Unexpected status code', response.status);
//       // Handle other error cases
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//     // Handle network errors or other exceptions
//   }
  
// }

// // Export the fetchDeezerInfo function to be used in other modules if needed
// module.exports = fetchDeezerInfo;
