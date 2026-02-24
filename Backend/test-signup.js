async function testSignup() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'New Test User',
                email: 'newtest' + Date.now() + '@gmail.com',
                password: 'Password123?',
                phone: '03001234567'
            })
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testSignup();
