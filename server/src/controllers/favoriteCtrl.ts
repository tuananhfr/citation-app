import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Favorite from "../models/FavoriteModel";

const createFavorite = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        citation,
        personnage,
        episode,
      }: { citation: string; personnage: string; episode: string } = req.body;

      const ExistFavorite = await Favorite.findOne(
        citation,
        personnage,
        episode
      );

      if (ExistFavorite) {
        await Favorite.deleteOne(ExistFavorite.id);
        res.json("La Citation a été supprimée avec succès !");
      } else {
        new Favorite(citation, personnage, episode).save();
        res.json("la Citation créée avec succès !");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
const getCitationsFavorite = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const getCitations = await Favorite.findAllFavorite();
      res.json(getCitations[0]);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getACitationFavo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const search = await Favorite.findById(Number(id));

      res.json(search[0]);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

export { createFavorite, getCitationsFavorite, getACitationFavo };
