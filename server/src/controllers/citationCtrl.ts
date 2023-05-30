import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Citation from "../models/CitationModel";

const createCitation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { citation }: { citation: string } = req.body;

      const ExistCitation = await Citation.findOne(citation);

      if (ExistCitation) {
        res.status(400).json({ msg: "This citation already exist." });
      } else {
        const newCitation = new Citation(citation).save();
        res.json(newCitation);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getCitations = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const getCitations = await Citation.findAll();
      res.json(getCitations[0]);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const updateACitation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { citation }: { citation: string } = req.body;

      const getACitation = await Citation.updateOne(Number(id), citation);
      res.json(getACitation[0]);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const deleteCitation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const deleteCitation = await Citation.deleteOne(Number(id));
      res.json(deleteCitation);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
const getACitation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const search = await Citation.findById(Number(id));

      res.json(search[0]);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getACitationRandom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const getCitations = await Citation.findRandom();
      res.json(getCitations[0]);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
export {
  createCitation,
  getCitations,
  getACitation,
  updateACitation,
  deleteCitation,
  getACitationRandom,
};
