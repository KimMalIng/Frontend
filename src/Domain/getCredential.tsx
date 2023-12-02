class Credential {
    static getCredentials(path:string, id: string, pwd: string): Promise<string | null> {
        return new Promise(() => {
            getCredential(id,pwd,path);
        });
    }
}

export default Credential;

async function getCredential(path:string, id:string, pwd:string) {
    const requestbody = {
        userId: id,
        userPassword: pwd,
    };
    try {
        const res = await fetch(`https://localhosy:8080/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestbody),
        });
        if (res.ok) {
            const data = await res.json();
            const authToken = data.token;
            localStorage.setItem("key", authToken);
        } else {
            alert("Wrong access");
        }
    } catch (error) {
        console.error('Error', error)
    }
}