import axios, { AxiosResponse } from "axios";
import { baseApiUrl, weatherApiKey } from "../constants/constants";
import { IWeatherReport } from "./weather.interface";

interface IAuth {
	access_key: string;
	query: string;
}

const weatherReportHandler = (response: AxiosResponse<IWeatherReport>) => {
	return response.data;
};

export const WeatherForecastResult = async (
	city: string | null | undefined,
) => {
	if (typeof city === "string") {
		return await axios
			.get<IWeatherReport, AxiosResponse<IWeatherReport>, IAuth>(baseApiUrl, {
				params: {
					access_key: weatherApiKey,
					query: city,
				},
			})
			.then(weatherReportHandler)
			.catch((error) => console.error(error));
	}
};
