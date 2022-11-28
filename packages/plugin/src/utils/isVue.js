const regexVue = /vue/gmi;

const hasVueInString = (str) => regexVue.test(str);


const hasVueRule = (rules) => {
    rules = rules || []
    const rulesString = rules.map(rule => rule.test).join("");
    return hasVueInString(rulesString)
}

const hasVueResolver = (resolve) => {
    if (resolve?.alias?.vue$) {
        return true
    }
    if (resolve?.extensions.find(".vue")) {
        return true
    }

    return false
}

const hasVuePlugin = (plugins) => {
    plugins = plugins || []
    const pluginString = plugins.map(plugin => plugin.__pluginName).join("");
    return hasVueInString(pluginString)
}

const isVue = (compiler) => {
    const { options } = compiler
    if (hasVueInString(options?.module?.noParse)
        || hasVueRule(options?.module?.rules)
        || hasVuePlugin(options?.plugins
            || hasVueResolver(options?.resolve))) {
        return true
    }

    return false
}

module.exports = isVue