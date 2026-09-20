// Verification script for live auth API integration
const API_BASE_URL = 'https://hackthon-dgcm.onrender.com/api/auth';

async function runTests() {
  console.log('=== STARTING LIVE AUTH API VERIFICATION ===\n');

  // Test 1: Forgot Password with valid email
  console.log('Test 1: POST /api/auth/forgot-password');
  const forgotRes = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'kevin@example.com' })
  });
  const forgotData = await forgotRes.json();
  console.log('Status:', forgotRes.status, 'Success:', forgotData.success, 'Message:', forgotData.message);
  if (!forgotRes.ok || !forgotData.success) {
    throw new Error('Forgot password test failed!');
  }
  console.log('PASS: Forgot Password API works.\n');

  // Test 2: Login with Invalid Credentials
  console.log('Test 2: POST /api/auth/login (Invalid credentials)');
  const badLoginRes = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'kevin@example.com', password: 'wrongpassword' })
  });
  const badLoginData = await badLoginRes.json();
  console.log('Status:', badLoginRes.status, 'Success:', badLoginData.success, 'Message:', badLoginData.message);
  if (badLoginRes.status !== 401 || badLoginData.success !== false) {
    throw new Error('Invalid login test failed!');
  }
  console.log('PASS: Invalid login correctly rejected with 401 & error message.\n');

  // Test 3: Login with Valid Credentials (kevin@example.com / password123)
  console.log('Test 3: POST /api/auth/login (Valid credentials)');
  const goodLoginRes = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'kevin@example.com', password: 'password123' })
  });
  const goodLoginData = await goodLoginRes.json();
  console.log('Status:', goodLoginRes.status, 'Success:', goodLoginData.success, 'Message:', goodLoginData.message);
  console.log('User:', goodLoginData.data?.user);
  console.log('Token exists:', !!goodLoginData.data?.token);
  if (!goodLoginRes.ok || !goodLoginData.success || !goodLoginData.data?.token) {
    throw new Error('Valid login test failed!');
  }
  console.log('PASS: Valid login returns user data and JWT token.\n');

  // Test 4: Signup with new unique user
  const uniqueId = Date.now();
  const newEmail = `user_${uniqueId}@example.com`;
  console.log(`Test 4: POST /api/auth/signup (New user: ${newEmail})`);
  const signupPayload = {
    firstName: 'Alex',
    lastName: 'Taylor',
    email: newEmail,
    phoneNumber: '+1 4155552671',
    city: 'San Francisco',
    country: 'United States',
    password: 'password123',
    confirmPassword: 'password123'
  };
  const signupRes = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupPayload)
  });
  const signupData = await signupRes.json();
  console.log('Status:', signupRes.status, 'Success:', signupData.success, 'Message:', signupData.message);
  console.log('Token exists:', !!signupData.data?.token);
  if (signupRes.status !== 201 || !signupData.success || !signupData.data?.token) {
    throw new Error('New user signup test failed!');
  }
  console.log('PASS: New user signup returns 201 and JWT token.\n');

  // Test 5: Signup duplicate email (expect 409)
  console.log(`Test 5: POST /api/auth/signup (Duplicate user: ${newEmail})`);
  const dupSignupRes = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupPayload)
  });
  const dupSignupData = await dupSignupRes.json();
  console.log('Status:', dupSignupRes.status, 'Success:', dupSignupData.success, 'Message:', dupSignupData.message);
  if (dupSignupRes.status !== 409 || dupSignupData.success !== false) {
    throw new Error('Duplicate signup test failed!');
  }
  console.log('PASS: Duplicate signup correctly rejected with 409 & "Email already exists".\n');

  console.log('=== ALL LIVE API VERIFICATION TESTS PASSED! ===');
}

runTests().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
