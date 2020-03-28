import * as express from 'express';
import { Request, Response } from 'express';
import UserService from '../../../service/UserService';
import IControllerBase from '../../spec/IControllerBase.interface';
import ResponseManager from '../../../managers/ResponseManager';
import ValidationResult from '../../../middleware/ValidationResult';
import TokenValidator from '../../../middleware/TokenValidator';

class UserController implements IControllerBase {

    public path = '/user';
    public router = express.Router();
    private userService: UserService;

    constructor() {
        this.initRoutes();
        this.userService = new UserService();
    }

    public initRoutes(): void {
        this.router.get(this.path,  this.createUser);
    }

    private createUser = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let iUser = await this.userService.createUser(req, responseHandler);
        res.status(200).json(iUser);
    }

}

export default UserController;
