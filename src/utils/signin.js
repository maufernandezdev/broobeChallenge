const SignIn = async (form) =>
{   
    try {
        const response = await fetch('https://challenge.broobe.net/api/v1/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const data = await response.json()
        if(data && data.length > 0){
            return data
        }
    } catch (error) {
        return {error: error}
    }
}

export default SignIn;