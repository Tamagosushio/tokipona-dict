import { Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { controller } from "./controllers/controller.ts";

const router = new Router();

router.get("/get-mean/:word", controller.getMean)

export { router };
