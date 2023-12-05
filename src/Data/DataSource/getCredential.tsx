const baseUrl = 'https://localhost:8080';

export default async function getCredential(
  path: string,
  id: string,
  pwd: string
) {
  const requestbody = {
    userId: id,
    userPw: pwd,
  };
  try {
    const res = await fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestbody),
    });
    if (res.ok) {
      const data = await res.json();
      const authToken = data.token;
      localStorage.setItem('key', authToken);
    } else {
      alert('Wrong access');
    }
  } catch (error) {
    console.error('Error', error);
  }
}
