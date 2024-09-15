import { Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { controller } from "./controllers/controller.ts";

const router = new Router();

router.get("/api/get-mean/:word", controller.getMean);
router.post("/api/get-mean-sentence", controller.getMeanSentence);

export { router };
