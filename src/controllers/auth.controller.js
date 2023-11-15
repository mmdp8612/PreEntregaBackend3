import passport from "passport";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const login = async (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
        }
        if (!user) {
          return res.status(400).json({ success: false, message: 'Login failed', error: info.message, validationErrors: '' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, config.SECRET_KEY);

        return res.json({ success: true, message: 'Login successful', user, token });
    })(req, res, next);
}

const register = async (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
        }
        if (!user) {
          return res.status(400).json({ success: false, message: 'Registration failed', error: info.message, validationErrors: '' });
        }
        return res.json({ success: true, message: 'Registration successful', user });
    })(req, res, next);
}

const github = async (req, res, next) => {
    passport.authenticate('github',{})(req, res, next);
}

const callbackGithub = async (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if(err){
            return res.redirect('/api/auth/errorGitHub');
        }

        req.session.user = {
            _id: user._id,
            first_name: user.name,
            email: user.email
        }

        return res.redirect('/view/products');
    })(req, res, next);
}

const errorGithub = async (req, res, next) => {
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error en Github'
    });
}

export {
    login,
    register,
    github,
    callbackGithub,
    errorGithub   
}