import { Router } from "express";
import {
  createFavorite,
  getCitationsFavorite,
  getACitationFavo,
} from "../controllers/favoriteCtrl";
const router: Router = Router();

router.post("/", createFavorite);
router.get("/", getCitationsFavorite);
router.get("/:id", getACitationFavo);

export default router;
