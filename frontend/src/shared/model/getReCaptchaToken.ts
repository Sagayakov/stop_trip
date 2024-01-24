export const getReCaptchaToken = async() => {
    const captchaSiteKey = process.env.CAPTCHA_SITE_KEY
    if(captchaSiteKey && typeof captchaSiteKey === 'string'){
        return await new Promise((resolve) => {
            grecaptcha.enterprise.ready(function () {
                grecaptcha.enterprise
                    .execute(captchaSiteKey, { action: 'submit' })
                    .then(function (token) {
                        resolve(token);
                    })
                // .catch(reject);
            });
        });
    } else{
        console.log('Нет ключа каптчи');
    }
}