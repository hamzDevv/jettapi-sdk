import axios from "axios";
import FormData from "form-data";
import fs from "fs"

class JettApi {
    constructor(apiKey, options = {}) {
        if (!apiKey) {
            throw new Error("API key is required");
        }

        this.apiKey = apiKey;
        this.baseUrl = options.baseUrl || "https://jettapi.vercel.app";

        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: this.apiKey
            },
            timeout: 60000
        });

        return new Proxy(this, {
            get: (target, category) => {
                if (category in target) {
                    return target[category];
                }
                return target.createCategory(category);
            }
        });
    }

    createCategory(category) {
        return new Proxy(
            {},
            {
                get: (_, endpoint) => {
                    return async (params = {}) => {
                        return this.request(category, endpoint, params);
                    };
                }
            }
        );
    }

    async request(category, endpoint, params = {}) {
        try {
            const hasFile = Object.values(params).some(
                value =>
                    value instanceof Buffer ||
                    value instanceof fs.ReadStream ||
                    value instanceof FormData
            );

            let res;

            if (hasFile) {
                const form = new FormData();
                for (const key in params) {
                    form.append(key, params[key]);
                }

                res = await this.client.post(`/api/${category}/${endpoint}`, form, {
                    headers: form.getHeaders()
                });
            } else {
                res = await this.client.get(`/api/${category}/${endpoint}`, {
                    params
                });
            }

            const data = res.data;

            if (data?.status === false) {
                throw new Error(data.error || "API request failed");
            }

            return data;
        } catch (err) {
            return {
                status: false,
                error: err.response?.data?.error || err.message || "Unknown error"
            };
        }
    }
}

export default JettApi;