import { QueryParams } from "@/common/models"


type HttpOptions = {
    body?: any
    headers?: { [key: string]: string }
    queryParams?: QueryParams
    contentType?: 'formdata' | 'json'
}
type SendOptions = {
    method: "GET" | "PUT" | "POST" | "PATCH" | "DELETE";
} & HttpOptions;

const headers: HeadersInit = {
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
};
let API_URL = 'http://blog-panel.suly-soft.com.www67.your-server.de/api'








const generateUrl = (endpoint: string, options?: HttpOptions) => {
    const queryParams: QueryParams | undefined = options?.queryParams;

    const link = new URL(`${API_URL}/${endpoint}`)
    if (queryParams) {
        for (const key in queryParams) {
            if (queryParams[key] !== undefined && queryParams[key] !== null)
                link.searchParams.append(key, queryParams[key] as string)
        }
    }
    return link.toString()
}

const http = {
    get: async <T>(url: string, options?: HttpOptions): Promise<T> => {
        const generatedUrl = generateUrl(url, options);
        const response = await send(generatedUrl, {
            ...options,
            method: "GET",
        });
        return JSON.parse(response);
    },
    post: async <T>(url: string, options?: HttpOptions): Promise<T> => {
        const generatedUrl = generateUrl(url, options);
        const response = await send(generatedUrl, {
            ...options,
            method: "POST",
        });
        return JSON.parse(response);
    },
    put: async <T>(url: string, options?: HttpOptions): Promise<T> => {
        const generatedUrl = generateUrl(url, options);
        const response = await send(generatedUrl, {
            ...options,
            method: "PUT",
        });
        return JSON.parse(response);
    },
    patch: async <T>(url: string, options?: HttpOptions): Promise<T> => {
        const generatedUrl = generateUrl(url, options);
        const response = await send(generatedUrl, {
            ...options,
            method: "PATCH",
        });
        return JSON.parse(response);
    },
    delete: async <T>(url: string, options?: HttpOptions): Promise<T> => {
        const generatedUrl = generateUrl(url, options);
        const response = await send(generatedUrl, {
            ...options,
            method: "DELETE",
        });
        return JSON.parse(response);
    },
};

const send = async (url: string, options: SendOptions): Promise<string> => {
    let result: string = await new Promise(async (resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(options.method, url)

        for (const key in headers) {
            xhr.setRequestHeader(key, headers![key])
        }
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('x-key', '54ab5d23-64bf-358b-bd1c-656b749d7f00')

        if (options.body) {
            xhr.send(options.body)
        } else {
            xhr.send()
        }

        xhr.onloadend = () => {
            if (xhr.status >= 200 && xhr.status < 300) {

                resolve(xhr.response)

            } else {
                const error: any = xhr.response != '' ? JSON.parse(xhr.response) : ''

                reject(error);
            }
        }
    })


    return result
}

export default http;


