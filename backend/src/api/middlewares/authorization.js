import { getAuth } from 'firebase-admin/auth';

const Authorization = {
    verifyIdToken: (req, res, callback) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({
                status: 'error',
                data: 'Unauthorized',
            });
        }

        const token = authorization.split(' ')[1];
        getAuth()
            .verifyIdToken(token)
            .then(callback)
            .catch((error) => {
                return res.status(403).json({
                    status: 'error',
                    data: 'Forbidden',
                });
            });
    },
    isAuthorized: (req, res, next) => {
        Authorization.verifyIdToken(req, res, (decodedToken) => {
            const email = decodedToken.email;
            const regex = /^\d{10}[a-zA-Z]+@ou\.edu\.vn$/;
            if (!regex.test(email)) {
                return res.status(403).json({
                    status: 'error',
                    data: 'Forbidden',
                });
            }
            req.uid = decodedToken.uid;
            req.mssv = email.slice(0, 10);
            next();
        });
    },
    isAdmin: (req, res, next) => {
        Authorization.verifyIdToken(req, res, (decodedToken) => {
            const email = decodedToken.email;
            const regex = /^it.mpclub@ou.edu.vn$/;
            if (!regex.test(email)) {
                return res.status(403).json({
                    status: 'error',
                    data: 'Forbidden',
                });
            }
            req.uid = decodedToken.uid;
            req.email = email;
            next();
        });
    },
};

export default Authorization;
