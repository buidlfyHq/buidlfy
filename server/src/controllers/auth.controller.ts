import { ErrorTypes, generateNonce, SiweMessage } from 'siwe';
import AuthService from '@/services/auth.service';

class AuthController {
  public authService = new AuthService();

  public createNonce = async (req, res) => {
    req.session.nonce = generateNonce();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(req.session.nonce);
  };

  public signin = async (req, res) => {
    try {
      if (!req.body.message) {
        res.status(422).json({ message: 'Expected prepareMessage object as body' });
        return;
      }

      // verify signature
      const message = new SiweMessage(req.body.message);
      const fields = await message.validate(req.body.signature);
      if (fields.nonce !== req.session.nonce) {
        console.log(req.session);
        res.status(422).json({
          message: `Invalid nonce.`,
        });
        return;
      }
      // signup or signin
      const address: string = req.body.address;
      const walletName: string = req.body.walletName;
      const data = await this.authService.authenticate(address, walletName);

      req.session.siwe = fields;
      req.session.cookie.expires = new Date(fields.expirationTime);
      req.session.save(() => res.status(200).json({ data, message: `You are authenticated and your address is: ${req.session.siwe.address}` }));
    } catch (e) {
      req.session.siwe = null;
      req.session.nonce = null;
      console.error(e);
      switch (e) {
        case ErrorTypes.EXPIRED_MESSAGE: {
          req.session.save(() => res.status(440).json({ message: e.message }));
          break;
        }
        case ErrorTypes.INVALID_SIGNATURE: {
          req.session.save(() => res.status(422).json({ message: e.message }));
          break;
        }
        default: {
          req.session.save(() => res.status(500).json({ message: e.message }));
          break;
        }
      }
    }
  };

  public getInformation = (req, res) => {
    if (!req.session.siwe) {
      res.status(401).json({ message: 'You have to first signin' });
      return;
    }
    console.log('User is authenticated!');
    res.setHeader('Content-Type', 'text/plain');
    res.send(`You are authenticated and your address is: ${req.session.siwe.address}`);
  };

  public signout = (req, res) => {
    if (!req.session.siwe) {
      res.status(401).json({ message: 'Already signed out' });
      return;
    }
    req.session.destroy((err: Error) => {
      if (err) {
        console.error('Error in signout', err);
      }
    });
    res.status(200).send('Signout successful');
  };
}

export default AuthController;
