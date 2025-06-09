const { getUser, insertUser } = require("../models/user.model");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();


const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
const getRefreshTokenCookieOptions = () => ({
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
});

const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log("Hi")
        const isUser = await getUser(email);
        if (isUser.length > 0) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await insertUser({ name, email, password: hashedPassword });

        const accessToken = generateAccessToken({ id: user.user_id, email: user.email, name: user.name });
        const refreshToken = generateRefreshToken({ id: user.user_id, email: user.email, name: user.name, password: user.password_hash });

        res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await getUser(email);
        if (isUser.length === 0) return res.status(401).json({ message: "Invalid email" });
        const user = isUser[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

        const accessToken = generateAccessToken({ id: user.id, email: user.email, name: user.name });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email, name: user.name, password: user.password });

        res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token, please login again" });

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({ message: "Invalid credentials" });
            const newAccessToken = generateAccessToken({ id: user.id, email: user.email, name: user.name });
            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const userLogout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", getRefreshTokenCookieOptions());
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { userSignup, userLogin, refreshToken, userLogout }