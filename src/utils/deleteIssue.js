const DeleteIssue = async (token,id) =>
{   
    try {
        const response = await fetch(`https://challenge.broobe.net/api/v1/issues/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
        });
        const data = await response.json()
        if(data) return data
    } catch (error) {
        return {error: error}
    }
}

export default DeleteIssue;