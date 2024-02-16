export const getDescriptionDetails = (description: string | undefined) => {
    let descriptionText = '';
    let descriptionLink = '';

    if (description) {
        descriptionText = description?.slice(0, description.indexOf('http'));
        descriptionLink = description?.slice(description.indexOf('http'));
    }

    return { descriptionText, descriptionLink };
};

export const getPattern = (messenger: string | undefined) => {
    if (messenger) {
        switch (messenger) {
            case 'Telegram':
                return /^[a-zA-Z0-9_]{5,32}$/;
            case 'Messenger':
                return /[0-9]{1,16}/;
            case 'WhatsApp':
                return /^\+?([0-9]){7,15}$/;
            case 'Viber':
                return /^\+?([0-9]){7,15}$/;
        }
    }
};
