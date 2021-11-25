import express, { Application, Request, Response } from "express";
import { DateTime } from "luxon";
import path from "path";
import hbs from "hbs";
import bodyParser from "body-parser";
import { WeatherForecastResult } from "./types/weather.model";
import { IWeatherReport } from "./types/weather.interface";

const app: Application = express();
const port: number = 3001;

//Define paths for Express Config
const publicDirectoryPath: string = path.join(__dirname, "../public/");
const viewsDirectoryPath: string = path.join(__dirname, "../templates/views/");
const partialsDirectoryPath: string = path.join(
	__dirname,
	"../templates/partials/",
);

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);

//Handlebars Configs
hbs.registerPartials(partialsDirectoryPath);

//Static resources to use
app.use(express.static(publicDirectoryPath));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (request: Request, response: Response) => {
	response.render("index", {
		city: "Essen",
	});
});

app.post("/", async (request: Request, response: Response) => {
	const city: string | null | undefined = request.body.city;
	const weatherApiResponse = (await WeatherForecastResult(
		city,
	)) as IWeatherReport;

	response.send(weatherApiResponse);
});

app.get("*", (request: Request, response: Response) => {
	response.render("404");
});

app.listen(port, () => {
	const now = DateTime.now()
		.toUTC()
		.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);

	console.log(`Server starting @ ${now}`);
	console.log(`Click http://localhost:${port}/ to open in browser`);
});
