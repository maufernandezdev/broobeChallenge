const GetPriorities = async (token) =>
{ 
    try {
      const response = await fetch('https://challenge.broobe.net/api/v1/priorities', { 
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
      }})
      const priorities = await response.json();
      if(priorities) return priorities
    } catch (error) {
        return error
    }
}

export default GetPriorities;