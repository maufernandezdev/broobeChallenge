const CreateIssue = async (form, token) =>
{   
    try {
        
        const response = await fetch('https://challenge.broobe.net/api/v1/issues', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(form)
        });
        const data = await response.json()
        if(data) return data
    } catch (error) {
        return {error: error}
    }
}

export default CreateIssue;