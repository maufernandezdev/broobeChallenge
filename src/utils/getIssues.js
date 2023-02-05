const GetIssues = async (token) =>
{
    try {
      const response = await fetch('https://challenge.broobe.net/api/v1/issues', { 
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
      }})
      const issues = await response.json();
      if(issues) return issues
    } catch (error) {
      return {error: error}
    }
}

export default GetIssues;