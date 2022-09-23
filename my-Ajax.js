function resolveData(obj) {
    const arr = []
    for (let key in obj) {
        let str = `${key}=${obj[key]}`
        arr.push(str)
    }
    return arr.join('&')
}

// const res = resolveData({ name: 'zs', age: 20 })
// console.log(res)


const myAjax = ({ method = 'get', url, data, success }) => {
    const xhr = new XMLHttpRequest()
    const queryString = resolveData(data)

    // method = method.toLowerCase()
    // method = method && method.toLowerCase() || 'get'

    switch (method) {
        case 'get':
            xhr.open(method, `${url}?${queryString}`)
            xhr.send()
            break
        case 'post':
            xhr.open(method, url)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(queryString)
            break
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const result = JSON.parse(xhr.responseText)
            success(result)
        }
    }
}