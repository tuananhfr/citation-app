import { Router } from "express";
import {
  createCitation,
  deleteCitation,
  getCitations,
  getACitation,
  updateACitation,
  getACitationRandom,
} from "../controllers/citationCtrl";
const router: Router = Router();
router.post("/", createCitation);
router.get("/", getCitations);
router.get("/random", getACitationRandom);

router.put("/:id", updateACitation);
router.delete("/:id", deleteCitation);
router.get("/:id", getACitation);

export default router;
