import { NextFunction, Router } from 'express';
import type { Request, Response } from 'express';
import { getIngredients, getRecipe, getRecipeByid, getTrendingRecipes } from './recipeController';
import { asyncHandler, authenticateToken } from 'src/lib/hepler';

export const recipeRouter = Router();

recipeRouter.get(
  '/get-recipe',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = await getRecipe(req);
    res.status(200).json({ data });
  })
);

recipeRouter.get(
    '/get-ingredients',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const data = await getIngredients(req);
      res.status(200).json({ data });
    })
  );

  recipeRouter.get(
    '/get-trending-recipe',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const data = await getTrendingRecipes();
      res.status(200).json({ data });
    })
  );

  recipeRouter.get(
    '/get-recipe/:id',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const data = await getRecipeByid(req);
      res.status(200).json({ data });
    })
  );
