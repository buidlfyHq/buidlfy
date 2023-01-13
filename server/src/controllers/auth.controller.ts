import { NextFunction, Request, Response } from 'express';
import { ErrorTypes, generateNonce, SiweMessage } from 'siwe';
import AuthService from '@/services/auth.service';
import { client } from '@/twitter';
import Logger from '@/logger';

class AuthController {
  public authService = new AuthService();

  public userStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.session.siwe) {
        res.status(401).json({ message: 'Already signed out' });
        return;
      }
      const data = await this.authService.getUser(req.session.siwe.address);
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(data);
    } catch (error) {
      Logger.error(`Error found in ${__filename} - isAuthenticated - `);
      Logger.error(error);
      next(error);
    }
  };

  public createNonce = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.session.nonce = generateNonce();
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(req.session.nonce);
    } catch (error) {
      Logger.error(`Error found in ${__filename} - createNonce - `);
      Logger.error(error);
      next(error);
    }
  };

  public signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.body.message) {
        res.status(422).json({ message: 'Expected prepareMessage object as body' });
        return;
      }
      // verify signature
      const message = new SiweMessage(req.body.message);
      const fields = await message.validate(req.body.signature);
      if (fields.nonce !== req.session.nonce) {
        res.status(422).json({ message: `Invalid nonce.` });
        return;
      }
      // signup or signin
      const { address, walletName } = req.body;
      const data = await this.authService.authenticate(address, walletName);
      req.session.siwe = fields;
      req.session.cookie.expires = new Date(Date.now() + 7200000);
      req.session.save(() =>
        res.status(200).json({ data, session: req.session, message: `You are authenticated and your address is: ${req.session.siwe.address}` }),
      );
    } catch (error) {
      req.session.siwe = null;
      req.session.nonce = null;
      Logger.error(`Error found in ${__filename} - signin - `);
      Logger.error(error);
      next(error);
      switch (error) {
        case ErrorTypes.EXPIRED_MESSAGE: {
          req.session.save(() => res.status(440).json({ message: error.message }));
          break;
        }
        case ErrorTypes.INVALID_SIGNATURE: {
          req.session.save(() => res.status(422).json({ message: error.message }));
          break;
        }
        default: {
          req.session.save(() => res.status(500).json({ message: error.message }));
          break;
        }
      }
    }
  };

  public signout = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session.siwe) {
      res.status(401).json({ message: 'Already signed out' });
      return;
    }
    try {
      req.session.destroy((error: Error) => {
        if (error) {
          throw error;
        }
      });
      res.status(200).send('Signout successful');
    } catch (error) {
      Logger.error(`Error found in ${__filename} - signout - `);
      Logger.error(error);
      next(error);
    }
  };

  public verifyTweet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.session.siwe) {
      res.status(401).json({ message: 'You have to first signin' });
      return;
    }
    try {
      const { twitterHandle } = req.body;
      const { data } = await client.v2.userByUsername(twitterHandle);
      if (!data) {
        res.status(400).json({ message: 'Invalid user handle' });
        return;
      }
      const verifiedUser = await this.authService.verify(twitterHandle, req.session.siwe.address, data);
      if ('errorMessage' in verifiedUser) {
        res.status(400).json({ message: verifiedUser.errorMessage });
        return;
      }
      res.status(200).json({ data: verifiedUser, message: 'Verification successful' });
    } catch (error) {
      Logger.error(`Error found in ${__filename} - verifyTweet - `);
      Logger.error(error);
      next(error);
    }
  };
}

export default AuthController;
