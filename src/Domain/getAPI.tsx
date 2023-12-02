const authToken = localStorage.getItem("key") ? localStorage.getItem("key") : null;

class BackEndDataSource {
    static getBackend(path: string, method: string): Promise<string | null> {
        return new Promise((resolve) => {
            if (method === "GET") {
                const a = getData(path);
                resolve(a)
            } else if (method === "POST") {
                const a = postData(path);
                resolve(a)
            }
        });
    }
};

async function getData(path: string) {
        try {
            const response = await fetch(`https://localhosy:8080/${path}`, {
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

async function postData(path: string) {
    try {
        const response = await fetch(`https://localhosy:8080/${path}`, {
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

export default BackEndDataSource;