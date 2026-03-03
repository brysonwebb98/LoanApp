const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Good Morning!';
    }

    if (currentHour <18) {
        return 'Good Afternoon!'
    }

    return 'Good Evening!';
}

const setHeadAssetsFunctionality = (res) => {
    res.locals.styles = [];
    res.locals.scripts = [];
    res.addStyle = (css, priority = 0) => {
        res.locals.styles.push({ content: css, priority });
    };
    res.addScript = (js, priority = 0) => {
        res.locals.scripts.push({ content: js, priority });
    };
    // These functions will be available in EJS templates
    res.locals.renderStyles = () => {
        return res.locals.styles
            // Sort by priority: higher numbers load first
            .sort((a, b) => b.priority - a.priority)
            .map(item => item.content)
            .join('\n');
    };
    res.locals.renderScripts = () => {
        return res.locals.scripts
            // Sort by priority: higher numbers load first
            .sort((a, b) => b.priority - a.priority)
            .map(item => item.content)
            .join('\n');
    };
};

export {setHeadAssetsFunctionality, getCurrentGreeting}