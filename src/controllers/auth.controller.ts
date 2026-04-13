import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    // console.log('Body iz controllera: ', req.body);

    // res.status(201).json({
    //     message: 'User registorvan bajo',
    //     data: req.body,
    // });
    throw new Error('Testna greska batke nova sa async')
}