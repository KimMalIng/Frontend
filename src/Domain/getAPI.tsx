const authToken = localStorage.getItem("key") ? localStorage.getItem("key") : null;
const baseUrl = "https://localhost:8080";
export default function getAPIData(method : string | "GET", path : string | null, body : string | null) {
    if(method === "GET") {
        return getData(path);
    } else if (method === "POST ") {
        return postData(path);
    } else if (body !== null) {
        return postBodyData(path, body);
    } else {
        return null
    }
}

async function getData(path: string | null) {
        try {
            const response = await fetch(`${baseUrl}/${path}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
}

async function postData(path: string | null) {
    try {
        const response = await fetch(`${baseUrl}/${path}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function postBodyData(path: string | null, body: string | null) {
    try {
        const response = await fetch(`${baseUrl}/${path}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}