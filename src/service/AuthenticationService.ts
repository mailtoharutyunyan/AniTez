import { UserModel } from '../model/User';
import BCryptManager from '../managers/BCryptManager';
import { Tokenizer } from '../managers/Tokenizer';
import AppError from '../middleware/AppError';

class AuthenticationService {

    async register(data, callback) {
        try {
            const newUser = new UserModel();
            newUser.name = data.name;
            newUser.email = data.email;
            newUser.password = <string>await BCryptManager.hash(data.password);
            newUser.role = 2;
            let iUser = await newUser.save();
            const token = Tokenizer.encode({
                uid: iUser._id,
                role: iUser.role
            });
            callback.onSuccess({
                userId: iUser._id,
                name: iUser.name,
                email: iUser.email,
                token: token
            }, 'User Successfully registered', 201)
        } catch (e) {
            callback.onError(e);
        }
    }

    async login(email: string, password: string, callback) {
        try {
            const dbUser = await UserModel.findOne({email: {$in: [email.toLowerCase()]}});

            const doesPasswordMatch = await BCryptManager.compare(password, dbUser.password);
            if (!doesPasswordMatch) {
                return callback.onError(new AppError('Wrong username or password', 404));
            }
            const token = Tokenizer.encode({
                uid: dbUser._id,
                role: dbUser.role
            });
            callback.onSuccess({
                userId: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                token: token
            });
        } catch (e) {
            callback.onError(e);
        }
    }

}


export default AuthenticationService;
