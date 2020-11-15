(async () => {
    const apiFetch = await fetch('https://raw.githubusercontent.com/spaces-dev/SpacesAPI/master/API.json')
    const interfaces = await apiFetch.json()
    const flattenedMethods = []

    for (const interfaceName in interfaces) {
        for (const methodName in interfaces[interfaceName]) {

            const method = interfaces[interfaceName][methodName]

            if (method.parameters) {
                for (const parameter of method.parameters) {
                    parameter._value = ''
                }
            }

            flattenedMethods.push({
                interface: interfaceName,
                method: methodName
            })
        }
    }

    const fuzzy = new Fuse(flattenedMethods, {
        shouldSort: true,
        threshold: 0.3,
        keys: [{
            name: 'interface',
            weight: 0.3
        }, {
            name: 'method',
            weight: 0.7
        }]
    })

    const app = new Vue({
        el: '#app',
        data: {
            userData: {
                sid: localStorage.getItem('sid') || '',
                CK: localStorage.getItem('CK') || ''
            },
            currentFilter: '',
            currentInterface: null,
            skipInterfaceSet: false,
            interfaces: interfaces
        },
        watch: {
            'userData.sid'(value) {
                if (this.isFieldValid('sid')) {
                    localStorage.setItem('sid', value)
                } else {
                    localStorage.removeItem('sid')
                }
            },
            'userData.CK'(value) {
                if (this.isFieldValid('CK')) {
                    localStorage.setItem('CK', value)
                } else {
                    localStorage.removeItem('CK')
                }
            },
            currentInterface(newInterface) {
                if (newInterface) {
                    document.title = `Spaces.ru API Methods - ${newInterface}`
                } else {
                    document.title = `Spaces.ru API Methods`
                }

                if (this.skipInterfaceSet) {
                    this.skipInterfaceSet = false
                    return
                }

                history.replaceState('', '', '#' + newInterface)
            }
        },
        mounted() {
            document.getElementById('loading').remove()
        },
        computed: {
            filteredInterfaces() {
                if (!this.currentFilter) {
                    return interfaces
                }

                const matches = fuzzy.search(this.currentFilter)
                const matchedInterfaces = {}

                for (const match of matches) {
                    if (!matchedInterfaces[match.interface]) {
                        matchedInterfaces[match.interface] = {}
                    }

                    matchedInterfaces[match.interface][match.method] = this.interfaces[match.interface][match.method]
                }

                this.currentInterface = matches.length > 0 ? matches[0].interface : ''
                return matchedInterfaces
            },
            interface() {
                return this.filteredInterfaces[this.currentInterface]
            },
        },
        methods: {
            isFieldValid(field) {
                switch (field) {
                    case 'sid':
                        return /^[a-zA-Z0-9]{20}$/i.test(this.userData[field])
                    case 'CK':
                        return /^[0-9]{6}$/i.test(this.userData[field])
                }
            },
            renderUri(methodName) {
                let host = 'https://spaces.im/api/'
                return `${host}${this.currentInterface}/${methodName}/`
            },
            renderParameters(method) {
                const parameters = new URLSearchParams()

                if (this.userData.sid) {
                    parameters.set('sid', this.userData.sid)
                }

                if (this.userData.CK) {
                    parameters.set('CK', this.userData.CK)
                }

                if (method.parameters) {
                    for (const parameter of method.parameters) {
                        if (!parameter._value) {
                            continue
                        }

                        parameters.set(parameter.name, parameter.type === 'bool' ? 1 : parameter._value)
                    }
                }

                if (parameters.toString() !== '') return '?' + parameters.toString()
            },
            useThisMethod(event, method) {
                if (method.httpmethod === 'POST') {
                    event
                }

                for (const field of event.target.elements) {
                    if (!field.value && !field.disabled && field.tagName === "INPUT") {
                        field.disabled = true
                        setTimeout(() => field.disabled = false, 0)
                    }
                }
            },
            copyUrl(event) {
                const element = event.target.closest('.input-group').querySelector('.form-control')
                const selection = window.getSelection()
                const range = document.createRange()
                range.selectNodeContents(element)
                selection.removeAllRanges()
                selection.addRange(range)
                document.execCommand('copy')
            },
            updateUrl(method) {
                history.replaceState('', '', '#' + this.currentInterface + '/' + method)
            },
            navigateSidebar(direction) {
                const keys = Object.keys(this.filteredInterfaces)
                const size = keys.length
                index = keys.indexOf(this.currentInterface) + direction
                this.currentInterface = keys[((index % size) + size) % size]
            }
        }
    })

    setInterface()
    window.addEventListener('hashchange', setInterface, false)

    function setInterface() {

        let currentInterface = location.hash
        let currentMethod = ''

        if (currentInterface[0] === '#') {
            const split = currentInterface.substring(1).split('/', 2)
            currentInterface = split[0]
            if (split[1]) {
                currentMethod = split[1]
            }
        }

        if (!interfaces.hasOwnProperty(currentInterface)) {
            currentInterface = ''
            currentMethod = ''
        } else if (!interfaces[currentInterface].hasOwnProperty(currentMethod)) {
            currentMethod = ''
        }

        app.skipInterfaceSet = true
        app.currentInterface = currentInterface

        if (currentMethod) {
            app.$nextTick(() => {
                const element = document.getElementById(currentMethod)
                if (element) {
                    element.scrollIntoView()
                }
            })
        }
    }
})()