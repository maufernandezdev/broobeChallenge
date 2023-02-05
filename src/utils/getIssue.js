const GetIssue = async (id, token) =>
{
    try {
        const response = await fetch(`https://challenge.broobe.net/api/v1/issues/${id}`, { 
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }})
        const issue = await response.json();
        if(issue) return issue
    } catch (error) {
        return {error: error}
    }
}

export default GetIssue;