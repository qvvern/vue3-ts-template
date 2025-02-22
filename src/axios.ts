import axios, { type AxiosInstance } from 'axios';

function createInstance(baseURL: string): AxiosInstance {
	const instance = axios.create();

	instance.interceptors.request.use(
		async (config) => {
			const request = config;
			request.baseURL = baseURL;

			return Promise.resolve(request);
		},
		(error) => Promise.reject(error),
	);

	return instance;
}

const axiosPokeapi = createInstance(import.meta.env.VITE_API_POKEAPI_URL);

export { axiosPokeapi };
