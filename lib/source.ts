import { docs } from "../.source/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
	baseUrl: "/posts",
	source: docs.toFumadocsSource(),
});
