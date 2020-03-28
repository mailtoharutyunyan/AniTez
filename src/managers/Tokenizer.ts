import TokenManager from './TokenManager';
import Constants from '../constant/Constants';

const Tokenizer = new TokenManager(
    Constants.secret,
    {
        expiresIn: 60 * 60 * 24,
        algorithm: 'HS256',
        noTimestamp: false
    }
);
export { Tokenizer }
