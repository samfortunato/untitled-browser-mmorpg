authorize();

async function authorize() {
	const token = await grantToken();
	const validation = await validate(token);
	warrantAccess(validation);

	window.location.href = './game.html';
}

/** TODO: Implement */
async function grantToken() {
	const token = localStorage.getItem('token');

	if (!token) window.location.href = './login.html';

	return token;
}

/** TODO: Implement */
async function validate(token) {
	return {
		isValid: true,
		isPaid: true,
	};
}

/** TODO: Ensure you don't need to do anything else here? */
function warrantAccess(validation) {
	if (!validation.isValid) window.location.href = './login.html';
	if (!validation.isPaid) window.location.href = './buy.html';
}
